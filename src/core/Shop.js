import React, { useEffect, useState} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import {prices } from './fixedPrices'


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category:[], price:[] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

     // load categories and set form data
     const init = async() => {
        const data = await getCategories();

        if(data.error) { 
            setError(data.error)
        } else {
            setCategories(data)
        }
    }

    useEffect( () => {
        init();
        loadFiltersResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log('shop',filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        
        if(filterBy == 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFiltersResults(myFilters.filters);

        setMyFilters(newFilters);
    }

    const handlePrice =value => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    const loadFiltersResults = async(newFilters) => {
        // console.log(newFilters);
        try {
            const data = await getFilteredProducts(skip, limit, newFilters);
            console.log('asdf',data.data);
            setFilteredResults(data.data);
        } catch (error) {
            console.log('watch the error',error);
            // setError(data.error);
        }
        
    }


    return(
        <Layout title ="Shop Page" description = "Search and find books of your code" className='container-fluid'>
           
        <div className='row'>
            <div className='col-4'>
                <h4>Filter by categories</h4>
                <ul>
                    <Checkbox 
                        categories={categories} 
                        handleFilters={ filters=>
                            handleFilters(filters, 'category')} 
                    />
                </ul>
                <h4>Filter by price range</h4>
                <div>
                    <RadioBox 
                        prices={prices} 
                        handleFilters={ filters=>
                            handleFilters(filters, 'price')} 
                    />
                </div>

            </div>
            <div className='col-8'>
                {JSON.stringify(filteredResults)}
                <h2 className='mb-4'>Products</h2>
                <div className='row'>
                    { filteredResults.map((product, index) => ( console.log(product) ))}
                        



                    {/* { return( 
                        filteredResults.map((product, index) => {
                            return(
                                <div key={index} className='col-6 mb-3'>
                                    <Card product={product} />
                                </div>
                            )
                        }) )  
                    } */}
                    {/* {console.log(filteredResults)} */}
                </div>

            </div>

        </div>
            
        </Layout>
    );
}

export default Shop;
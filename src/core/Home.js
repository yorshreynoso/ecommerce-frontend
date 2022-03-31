import React, { useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';


const Home = () => {
    const [productBySell, setProductsBySell] = useState([]);
    const [productByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = async() => {
        try {
            const data = await getProducts('sold');
            setProductsBySell(data.products);
  
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }
    
    const loadProductsByArrival = async() => {
        try {
            const data = await getProducts('createdAt');
            setProductsByArrival(data.products);
            
            
        } catch (error) {
            console.log('Error setting loadProductsByArrival', error);
            setError(error);
        }
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, [])

    return(
        <Layout title ="Home Page" description = "Node React E-comerce App" className='container-fluid'>
            {/* <p>{JSON.stringify(productByArrival)}</p>
            <hr></hr>
            <p>{JSON.stringify(productBySell)}</p> */}
     
            <h2 className='mb-4'>New Arrivals</h2>
            <div className='row'>
                {productByArrival.map((product, index) => ( 
                    <Card key={index} product={product} /> 
                ))}
            </div>

                <h2 className='mb-4'>Best Sellers</h2>
            <div className='row'>
                {productBySell.map((product, index) => ( 
                    <Card key={index} product={product} /> 
                ))}
            </div>
            
        </Layout>
    );

}

export default Home;
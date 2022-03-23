import React, {Fragment, useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import axios, * as others from 'axios';



const Home = () => {
    const [productBySell, setProductsBySell] = useState([]);
    const [productByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = async() => {
        try {
            const data = await getProducts('sold');
            console.log(data);
            setProductsBySell(data);

            
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }
    
    const loadProductsByArrival = async() => {
        try {
            const data = await getProducts('createdAt');
            console.log(data);
            setProductsByArrival(data);
            
            
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, [])

    return(
        <Layout title ="Home Page" description = "Node React E-comerce App">
            <p>{JSON.stringify(productByArrival)}</p>
            <hr></hr>
            <p>{JSON.stringify(productBySell)}</p>
            
        </Layout>
    );

}

export default Home;
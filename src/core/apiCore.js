import {API} from '../config';
import axios, * as others from 'axios';



export const getProducts = async(sortBy) => {

    try {
        const res = await axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`);
        return res.data;
    } catch (error) {
        return error.response.data;
    } 
}

export const getCategories = async() => {
    try {
        const res = await axios.get(`${API}/categories`);
        return res.data;

    } catch (error) {
        return error.response.data;
    } 
}

export const getFilteredProducts = async(skip, limit, filters = {}) => { // REGISTER
    const data = {
        limit, skip, filters
    }

    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(
            `${API}/products/by/search`, 
            data , 
            // { headers: { 
            //         mode:'no-cors', 'Access-Control-Allow-Origin': '*', 
            //         'Authorization':`Bearer ${token}`
            //     }
            // }
        );
        return res.data;
        
    } catch (error) {
        return error.response.data;
    }
}
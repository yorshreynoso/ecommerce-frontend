import {API} from '../config';
import axios, * as others from 'axios';



export const getProducts = async(sortBy) => {
    console.log('gettin gproducts fileteredd');
    try {
        const res = await axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`);
        return res.data;
    } catch (error) {
        return error.response.data;
    } 
}
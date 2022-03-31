import {API} from '../config';
import axios, * as others from 'axios';


export const createCategory = async(userId, token, category) => { // REGISTER

    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(
            `${API}/category/create/${userId}`, 
            category , 
            { headers: { 
                    mode:'no-cors', 'Access-Control-Allow-Origin': '*', 
                    'Authorization':`Bearer ${token}`
                }
            }
        );
        return res.data;
        
    } catch (error) {
        return error.response.data;
    }
}


// TODO there is an error sending information, could be in front or in the backend
export const createProduct = async(userId, token, product) => { // REGISTER
    
    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(
            `${API}/product/create/${userId}`, 
            product , 
            { headers: { 
                    //'content-type': 'multipart/form-data',
                    // enctype='application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    mode:'no-cors', 'Access-Control-Allow-Origin': '*', 
                    'Authorization':`Bearer ${token}`
                }
            }
        );
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
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

export const createProduct = async(userId, token, product) => { // REGISTER

    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(
            `${API}/product/create/${userId}`, 
            product , 
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
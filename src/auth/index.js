import {API} from '../config';
import axios, * as others from 'axios';


export const signup = async(name, email, password) => { // REGISTER
    // console.log(name, email, password);
    const body = {name, email, password};
    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(`${API}/signup`, body , {header: { mode:'no-cors', 'Access-Control-Allow-Origin': '*'}});
        
        return res.data;
        
    } catch (error) {
        return error.response.data;
    }
}

export const signin = async( email, password) => { // LOGIN
    // console.log( email, password);
    const body = { email, password};
    try {
        // console.log(`${API}/signup`);
        const res = await axios.post(`${API}/signin`, body , {header: { mode:'no-cors', 'Access-Control-Allow-Origin': '*'}});
        
        return res.data;
        
    } catch (error) {
        console.log('entrando al error del login');
        return error.response.data;
    }
}

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const signout = async(next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        
        try {
            const response = await axios.get(`${API}/signout`);
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined')  return false;

    if(!localStorage.getItem('jwt')) return false;

    return JSON.parse( localStorage.getItem('jwt'));
    
}
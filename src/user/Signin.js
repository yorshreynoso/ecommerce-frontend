import React, {useState} from 'react';
import Layout from '../core/Layout';
import {API} from '../config';
import {Link, Redirect} from 'react-router-dom';
import axios, * as others from 'axios';
import {signin, authenticate, isAuthenticated} from '../auth';



const Signin =() => {
    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferer: false
    });

    const {email, password, loading, error, redirectToReferer } = values;
    const {user} = isAuthenticated();
    
    const handleChange = name => event => { //duda
        setValues({...values, error: false, [name]:event.target.value });
    }

    const clickSubmit = async(event) => {
        event.preventDefault();
        setValues({...values, error:false, loading: true });
        const data = await signin(email, password);
        console.log('showwing', data);
        
        if(data.error) {
            
            setValues({...values, error:data.error, loading:false });
        } 
        else {
            authenticate(data, () => {
                setValues({...values, redirectToReferer: true, loading:false });
            })
        }
    }

    const showError = () => {
        return(
               <div className="alert alert-danger" style={{display: error ? '': 'none'}}> {error}</div>
        )
    }
        
    const showLoading = () => {
        console.log('the loading.....');
        return (loading && (<div className='alert alert-success'><h2>Loading...</h2></div>));
    }

    const redirectUser = () => {
        if(redirectToReferer) {
            if(user && user.role === 1) return <Redirect to='/admin/dashboard'/>

            return <Redirect to='/user/dashboard'/>
        }
        if(isAuthenticated()) return <Redirect to='/'/>
    }


    const signupForm = () => {
        return(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}></input>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Pasword</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
        )
    }




    return( 

            <Layout title= "Signin" 
                    description="Signin Node React E-commerce App"
                    className="container col-md-8 offset-md-2">
                {showLoading()}
                {showError()}

                {signupForm()}
                {redirectUser()}
                {/* {JSON.stringify(values)} */} 
            </Layout>
    );
}

export default Signin;
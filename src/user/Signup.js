import React, {useState} from 'react';
import Layout from '../core/Layout';
import {API} from '../config';
import {Link} from 'react-router-dom';
import axios, * as others from 'axios';
import {signup} from '../auth';



const Signup =() => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name, email, password, success, error } = values;

    const handleChange = name => event => { //duda
        setValues({...values, error: false, [name]:event.target.value });
    }

    const clickSubmit = async(event) => {
        event.preventDefault();
        setValues({...values, error:false });
        const res = await signup(name, email, password);
        
        if(res.error) {
            setValues({...values, error:res.error, success:false });
        } 
        else {
            setValues({...values, name:'', email:'', password:'', error:'', success:true });
        }
    }

    const showError = () => {
        return(
               <div className="alert alert-danger" style={{display: error ? '': 'none'}}> {error}</div>
        )
    }
        
    const showSuccess = () => {
        return(
            <div className='alert alert-success' style={{display: success ? '' : 'none'}}>New account is created. please <Link to='/signin'>Signin</Link></div>
        );
    }


    const signupForm = () => {
        return(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}></input>
            </div>
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
        <Layout title= "Signup" 
                description="Signup Node React E-commerce App"
                className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}

            {signupForm()}
            {/* {JSON.stringify(values)} */} 
        </Layout>
    );
}

export default Signup;
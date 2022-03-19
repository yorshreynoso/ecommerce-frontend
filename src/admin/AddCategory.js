import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import {createCategory } from './apiAdmin';


const AddCategory = () => {
    const [name, setName]         = useState('');
    const [error, setError]        = useState(false);
    const [success, setSuccess ]    = useState(false);

    // desctructure user and token from localstorage

    
    const {user, token} = isAuthenticated();

    const handleChange = (e) => { //capture every typing
        setError('');
        setName(e.target.value);

    }

    const clickSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to api to create category
        const data = await createCategory(user._id, token, {name});
        if(data.error) {
            setError(true);
        } else {
            setError('');
            setSuccess(true);
        }
    }


    const newCategoryForm = () => {
        return(
                <form onSubmit={clickSubmit}>
                    <div className="form-group">
                        <label className='text-muted'>Name</label>
                        <input type="text" className='form-control' onChange={handleChange} value={name} autoFocus required/>
                    </div>
                    <button className='btn btn-outline-primary' style={{"marginTop":"10px"}}>Create Category</button>
                </form>

        )
    }

    const showSuccess = () => {
        if(success) {
            return(<h3 className='text-success'>{name} is created</h3>)
        }
    }

    const showError = () => {
        if(error) {
            return(<h3 className='text-danger'>category should be unique, {name} is already added</h3>)
        }
    }

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link to='/admin/dashboard' className='text-warning'>Back to dashboard</Link>
            </div>
        )
    }

    return (
        <Layout title="Add new category" description={`Hello ${user.name}, add a new category`}>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                { showSuccess() }
                { showError() }
                { newCategoryForm() }
                { goBack() }
            </div>
        </div>
     </Layout>
    )
}

export default AddCategory;
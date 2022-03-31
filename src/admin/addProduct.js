import React, {Fragment, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import {createProduct, getCategories } from './apiAdmin';


const AddProduct = () => {
    const {user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:'',
        formData:''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,
    } = values;

    // load categories and set form data
    const init = async() => {
        const data = await getCategories();
        if(data.error) { 
            setValues({...values, error: data.error })
        } else {
            setValues({...values, categories:data, formData: new FormData() })
        }
    }

    useEffect(() => {
        init();
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value });
    }

    const clickSubmit = async(event) => {
        event.preventDefault();
        setValues({...values, error:'', loading:true });
        
        const data = await createProduct(user._id, token, formData);
        if(data.error) {
            setValues({...values, error:data.error });
        } else {
            setValues({...values, name:'', description:'', photo:'', price:'', quantity:'', loading:false, createdProduct:data.name });
        }
    }

    const newPostForm = () => {
        return(
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Submit Photo</h4>
                <div className="form-group">
                    <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*'></input>
                    </label>
                </div>
                <div className="form-group">
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} type='text' className='form-control' value={name}></input>
                </div>
                <div className="form-group">
                    <label className='text-muted'>Description</label>
                    <textarea onChange={handleChange('description')} type='text' className='form-control' value={description}></textarea>
                </div>

                <div className="form-group">
                    <label className='text-muted'>Price</label>
                    <input onChange={handleChange('price')} type='number' className='form-control' value={price}></input>
                </div>

                <div className="form-group">
                    <label className='text-muted'>Category </label>
                    <select onChange={handleChange('category')}  className='form-control'>
                        <option>Please Select</option>
                        {categories && categories.map((category, index) => ( <option key={index} value={category._id}>{category.name} </option> ))}
                        
                    </select>
                </div>

                <div className="form-group">
                    <label className='text-muted'>Shipping</label>
                    <select onChange={ handleChange('shipping') }  className='form-control'>
                        <option>Please Select</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className='text-muted'>Quantity</label>
                    <input onChange={handleChange('quantity')} type='number' className='form-control' value={quantity}></input>
                </div>

                <button className='btn btn-outline-primary' style={{'marginTop':'10px'}}>Create Product</button>
            </form>
        )
    }

    const showError = () => {
        return(
            <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return(
            <div className='alert alert-info' style={{display:createdProduct ? '' : 'none'}}>
                <h2>{createdProduct} is created</h2>

            </div>
        )
    }

    const showLoading = () => {
        loading && (<div className='alert.alert-success'>Loading...</div>)
    }

    return(
        
        <Layout title="Add new product" description={`Hello ${user.name}, add a new product`}>
        <div className="row">
            <div className="col-md-8 offset-md-2">
            <h1>hello</h1>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            </div>
        </div>
        </Layout>
        
    )
}

export default AddProduct;
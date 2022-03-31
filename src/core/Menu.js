import React, { Fragment } from "react";
import {Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";




const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color: '#000000'}
    } else {
        return { color: '#ffffff'}
    }
}



const Menu = ({history}) => {
    // console.log('history location',history.location);
    return(
        <Fragment>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to='/'> HOME</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to='/shop'> SHOP</Link>
                </li>
                
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to='/dashboard'> DASHBOARD</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'> DASHBOARD</Link>
                    </li>
                )}

               {!isAuthenticated() && (
                   <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to='/signin'> SIGNIN</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'> SIGNUP</Link>
                        </li>
                   </Fragment>
               )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor:'pointer', color:'#ffffff'}} 
                        onClick={ () => signout( () => { 
                            history.push('/')})
                        } 
                        > SIGNOUT</span>
                    </li>
                )}
            </ul>

        </Fragment>
    )
}

export default withRouter(Menu);
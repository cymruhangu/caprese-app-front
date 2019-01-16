import React from 'react';
import  { NavLink } from 'react-router-dom';
import './navagation.css';

const Navigation = () => (
    <header>
        <h1>Caprese App</h1>
        <NavLink to="/" activeClassName="is-active">Home</NavLink>
        <NavLink to="/projectcreate" activeClassName="is-active">Create Project</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        <NavLink to="/login" activeClassName="is-active">Login</NavLink>
        <NavLink to="/" activeClassName="is-active">Logout</NavLink>
        
    </header>
);

export default Navigation;
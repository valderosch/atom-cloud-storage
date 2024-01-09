import React from 'react';
import './Navbar.less';
import Logo from '../../assets/img/logo.png'
import './NeNavbar.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar_logo">
                    <img src={Logo} alt="cloud-flat" className="logo"/>
                    <h3 className="logo_title">Atom Cloud</h3>
                </div>
                <div className="auth">
                    <p className="navbar_login">
                        <NavLink to="/login">Login</NavLink>
                    </p>
                    <p className="navbar_register">
                        <NavLink to="/registration">Registration</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
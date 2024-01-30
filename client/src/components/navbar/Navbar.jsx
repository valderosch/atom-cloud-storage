import React from 'react';
import './Navbar.css';
import Logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducers/userReducer";
import Searchbar from "../disk/searchbar/Searchbar";
import noAvatar from '../../assets/img/user.png';
import {API_URL} from "../../config";

const Navbar = () => {
    const isUserAuthorised = useSelector(state => state.user.isAuthorised);
    const user = useSelector(state => state.user.currentUser);
    console.log(user);
    const dispatch = useDispatch();
    const avatarImg = user.avatar ? `${API_URL + '24a5a1f9-2178-47ca-9cce-8760e980b04e.jpg'}` : noAvatar;

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar_logo">
                    <img src={Logo} alt="cloud-flat" className="logo"/>
                    <h3 className="logo_title">Atom Cloud</h3>
                </div>
                {isUserAuthorised &&
                    <div className="navbar_search">
                        <Searchbar/>
                    </div>
                }
                <div className="auth">
                    {!isUserAuthorised &&
                        <p className="navbar_login">
                            <NavLink to="/login" className="auth_btn">Login</NavLink>
                        </p>
                    }
                    {!isUserAuthorised &&
                        <p className="navbar_register">
                            <NavLink to="/registration" className="auth_btn">Registration</NavLink>
                        </p>
                    }
                    {isUserAuthorised &&
                        <div className="auth__block">
                            <NavLink to='/profile'>
                                    <img src={avatarImg} alt="user" className="avatar__img"/>
                            </NavLink>
                            <p className="auth_btn" onClick={() => dispatch(logOut())}>Logout</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
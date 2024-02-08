import React, {useEffect, useState} from 'react';
import './Navbar.css';
import Logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut, setUserData} from "../../reducers/userReducer";
import Searchbar from "../disk/searchbar/Searchbar";
import noAvatar from '../../assets/img/user.png';
import {API_URL} from "../../config";
import {authentication} from "../../actions/user";

const Navbar = () => {
    const isUserAuthorised = useSelector(state => state.user.isAuthorised);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [avatarImg, setAvatarImg] = useState(noAvatar);
    const avatar = !loading ? `${API_URL + avatarImg.avatar}` : noAvatar;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await dispatch(authentication());
                setAvatarImg(result);
                dispatch(setUserData(result))
                setLoading(false);
            } catch (error) {
                console.error('Authentication error:', error);
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch]);

    return (
        <div className="navbar">
            <div className="container">
               <NavLink className="logo__link" to='/'>
                   <div className="navbar_logo">
                       <img src={Logo} alt="cloud-flat" className="logo"/>
                       <h3 className="logo_title">Atom Cloud</h3>
                   </div>
               </NavLink>
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
                                    <img  key={avatarImg} src={avatarImg.avatar !== null ? avatar: noAvatar} alt="user" className="avatar__img"/>
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
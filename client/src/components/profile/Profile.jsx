import React from 'react';
import defaultImage from '../../assets/img/user.png';
import {useDispatch, useSelector} from "react-redux";
import {removeUserAvatar, uploadUserAvatar} from "../../actions/user";
import {NavLink} from "react-router-dom";
import './profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    console.log(user);
    const username = 'badmail';


    function onChangeHandler(e) {
            const file = e.target.files[0];
            dispatch(uploadUserAvatar(file));
    }

    return (
        <div className='profile'>
            <div className="profile__content">
                <div className="avatar">
                    <img src={defaultImage} alt="img" className='user__img'/>
                    <div className="avatar__controls">
                        <div className="title">Controls</div>
                        <button className="delete__btn" onClick={() => dispatch(removeUserAvatar())}>Remove photo</button>
                        <input accept="image/*" onChange={e => onChangeHandler(e)} type="file" className="upload__avatar" placeholder="Upload photo"/>
                    </div>
                </div>
                <div className="info">
                    <div className="info__email">Welcome back, {username}</div>
                    <div className="info__files">FILES</div>
                </div>
                <div className="link">
                    <NavLink to='/' className="navlink">MAIN</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
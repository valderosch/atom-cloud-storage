import React from 'react';
import defaultImage from '../../assets/img/user.png';
import {useDispatch} from "react-redux";
import {removeUserAvatar, uploadUserAvatar} from "../../actions/user";
import {NavLink} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();


    function onChangeHandler(e) {
            const file = e.target.files[0];
            dispatch(uploadUserAvatar(file));
    }

    return (
        <div className='profile'>
            <div className="profile__content">
                <div className="avatar">
                    <img src={defaultImage} alt="img" className='avatar__img'/>
                    <button className="delete__btn" onClick={() => dispatch(removeUserAvatar())}>DELETE</button>
                    <input accept="image/*" onChange={e => onChangeHandler(e)} type="file" className="upload__avatar" placeholder="Upload photo"/>
                </div>
                <NavLink to='/'>HOME</NavLink>
            </div>
        </div>
    );
};

export default Profile;
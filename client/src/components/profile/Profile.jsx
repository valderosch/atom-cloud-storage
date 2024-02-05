import React, {useState} from 'react';
import defaultImage from '../../assets/img/user.png';
import {useDispatch, useSelector} from "react-redux";
import {removeUserAvatar, uploadUserAvatar} from "../../actions/user";
import {calculatePercentage, formatFileSize} from "../disk/explorer/utility";
import {NavLink} from "react-router-dom";
import './profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [popup, setPopup] = useState(false);
    console.log(user);
    const user_test = {username: 'commonuser999', email: 'commonuser999@mail.com', used: 1.1, available: 10, percent: 11}

    function onChangeHandler(e) {
            const file = e.target.files[0];
            dispatch(uploadUserAvatar(file));
    }

    return (
        <div className='profile' onClick={() => setPopup(false)}>
            <div className="profile__content">
                <div className="profile__data">
                    <div className="avatar" onClick={event => event.stopPropagation()}>
                        <img src={defaultImage} alt="img" className='user__img'/>
                        <div className="edit-button" onClick={(e) => setPopup(!popup)}>🖉</div>
                        {popup === true &&
                            <div className="avatar__popup">
                                <button className="delete__btn" onClick={() => dispatch(removeUserAvatar())}>Remove photo ⨯</button>
                                <div className="avatar__handler">
                                    <label htmlFor="upload__avatar" className="upload__avatar__label"> Upload Photo ⭱</label>
                                    <input
                                        accept="image/*"
                                        onChange={e => onChangeHandler(e)}
                                        type="file" id="upload__avatar"
                                        className="upload__avatar"
                                        placeholder="Upload photo"
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="info">
                        <div className="info__username">{user_test.username} 🙋‍♂️</div>
                        <div className="info__block">
                            <div className="info__email">Email: {user_test.email}</div>
                            <div className="info__item">Your plan: <b>BASIC</b></div>
                            <div className="info__item">Available space: <b>{user_test.available} GB</b></div>
                            <div className="info__item">Used Space: <b>{user_test.used} GB</b></div>
                            <div className="info__bar__wrapper">
                                <div className="info__bar" style={{width: user_test.percent + '%'}}></div>
                            </div>
                            <div className="info__loadstatus" style={{marginLeft: user_test.percent-9.5 + '%'}}>👆<br/>You are here</div>
                        </div>
                    </div>
                </div>
                <div className="link">
                    <NavLink to='/' className="navlink">MAIN</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
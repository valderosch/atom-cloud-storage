import React, {useState} from 'react';
import defaultImage from '../../assets/img/user.png';
import {useDispatch, useSelector} from "react-redux";
import {removeUserAvatar, uploadUserAvatar} from "../../actions/user";
import {calculatePercentage, formatFileSize} from "../disk/explorer/utility";
import {NavLink} from "react-router-dom";
import './profile.css';
import {API_URL} from "../../config";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const [popup, setPopup] = useState(false);

    const avatar = user.avatar ? `${API_URL + user.avatar}` : defaultImage;
    const name = user.email.split('@')[0];
    const maxsize = formatFileSize(1024**3);
    const usedSpace = formatFileSize(user.usedSpace);
    const percentage = calculatePercentage(user.usedSpace, 1024**3);

    function onChangeHandler(e) {
            const file = e.target.files[0];
            dispatch(uploadUserAvatar(file));
            setPopup(false);
    }

    return (
        <div className='profile' onClick={() => setPopup(false)}>
            <div className="profile__content">
                <div className="profile__data">
                    <div className="avatar" onClick={event => event.stopPropagation()}>
                        <img src={avatar} alt="img" className='user__img'/>
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
                        <div className="info__username">{name} 🙋‍♂️</div>
                        <div className="info__block">
                            <div className="info__email">Email: {user.email}</div>
                            <div className="info__item">Your plan: <b>BASIC</b></div>
                            <div className="info__item">Available space: <b>{maxsize}</b></div>
                            <div className="info__item">Used Space: <b>{usedSpace}</b></div>
                            <div className="info__bar__wrapper">
                                <div className="info__bar" style={{width: percentage + '%'}}></div>
                            </div>
                            <div className="info__loadstatus" style={{marginLeft: percentage-9.5 + '%'}}>👆<br/>You are here</div>
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
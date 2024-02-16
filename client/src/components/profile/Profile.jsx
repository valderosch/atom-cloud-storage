import React, {useState} from 'react';
import defaultImage from '../../assets/img/user.png';
import {useDispatch, useSelector} from "react-redux";
import {removeUserAvatar, uploadUserAvatar} from "../../actions/user";
import {calculatePercentage, formatFileSize} from "../disk/explorer/utility";
import fileImg from '../../assets/img/context/download.png'
import {NavLink} from "react-router-dom";
import './profile.css';
import {API_URL} from "../../config";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const [popup, setPopup] = useState(false);
    console.log(user);

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
                    <div className="user-info">
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
                        </div><br/>
                    </div>
                    <div className="stats_block">
                        <div className="statistics">
                            <div className="stats-title">/Statistic</div>
                            <div className="stats-grid">
                                <div className="stats-elem">
                                    <div className="elem-title">Files 🛈</div>
                                    <div className="elem-data">24</div>
                                </div>
                                <div className="stats-elem">
                                    <div className="elem-title">Space 🛈</div>
                                    <div className="elem-data">536 MB</div>
                                </div>
                                <div className="stats-elem">
                                    <div className="elem-title">Folders 🛈</div>
                                    <div className="elem-data">9</div>
                                </div>
                                <div className="stats-elem">
                                    <div className="elem-title">Docs 📄</div>
                                    <div className="elem-data">12 / 24</div>
                                </div>
                                <div className="stats-elem">
                                    <div className="elem-title">Media 🌄</div>
                                    <div className="elem-data">8 / 24</div>
                                </div>
                                <div className="stats-elem">
                                    <div className="elem-title">Other 📊</div>
                                    <div className="elem-data">4 / 24</div>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="stats-title">/Account</div>
                            <div className="actions-block">
                                <div className="user-story">
                                    <div className="story-title">👇 last added</div>
                                    <div className="story-data">
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">files.png</div>
                                        </div>
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">FunnyFragon.gif</div>
                                        </div>
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">MetallPoint.png</div>
                                        </div>
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">CosswortdFordF250Heavy.png</div>
                                        </div>
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">DestinyOfKing.mp4</div>
                                        </div>
                                        <div className="story-item">
                                            <img src={fileImg} alt="item" className="item-img"/>
                                            <div className="item-filename">Appointment-2023-03-25.png</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-actions">
                                    <div className="story-title">controls</div>
                                    <div className="actions-block">
                                        <div className="action">
                                            <div className="action-indicator">a@a</div>
                                            <div className="action-title">change e-mail</div>
                                        </div>
                                        <div className="action">
                                            <div className="action-indicator">***</div>
                                            <div className="action-title">change password</div>
                                        </div>
                                        <div className="action">
                                            <div className="action-indicator">..❌</div>
                                            <div className="action-title">delete all</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="link">
                    <NavLink to='/' className="navlink">← MAIN</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
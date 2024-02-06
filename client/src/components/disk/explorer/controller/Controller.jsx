import React, {useState} from 'react';
import {calculatePercentage, formatFileSize} from "../utility";
import fileImg from '../../../../assets/img/file.png';
import dirImg from '../../../../assets/img/folder.png';
import { setPopupDisplay} from "../../../../reducers/fileReducer";
import './controller.css';
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../../../actions/file";

const Controller = ({data}) => {
    const usedSpace = calculatePercentage(data.total, data.available);
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const [buttonPopup, setButtonPopup] = useState(false);
    const dispatch = useDispatch();

    function createButtonHandler(e) {
        e.stopPropagation();
        setButtonPopup(!buttonPopup);
    }

    function popupHandler() {
        dispatch(setPopupDisplay('flex'));
        setButtonPopup(false);
    }

    function fileUploadHandler(e) {
        const files = [...e.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
        setButtonPopup(false);
    }

    return (
        <div className="controller">
            <button className="controller__buttons__create" onClick={(e) => createButtonHandler(e)}>Create  +</button>
            <div className="controller__storage">
                <div className="storage__title">Your Workspace</div>
                    <div className="storage__bar__wrapper">
                        <div className="storage__bar" style={{width: usedSpace + '%'}}></div>
                    </div>
                <div className="storage__info">Used: {formatFileSize(data.total)} / {formatFileSize(data.available)}</div>
            </div>
            { buttonPopup &&
                <div className="button__popup" onClick={() => setButtonPopup(false)}>
                    <div className="button__popup__body" onClick={event => event.stopPropagation()}>
                        <div className="button__popup__item" onClick={() => popupHandler()}>
                            <img className="popup__item__img" src={dirImg} alt="directory"/>
                            <span className="make-dir__title">Create directory</span>
                        </div>

                        <div className="button__popup__item">
                            <img className="popup__item__img" src={fileImg} alt="file"/>
                            <div className="input__handler">
                                <label htmlFor="upload__input" className="upload__input__label">Upload File</label>
                                <input
                                    multiple={true} type="file"
                                    onChange={(e) => fileUploadHandler(e)}
                                    id="upload__input"
                                    className="upload__input"
                                    placeholder="upload file"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Controller;
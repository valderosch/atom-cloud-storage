import React, {useState} from 'react';
import {calculatePercentage, formatFileSize} from "../utility";
import fileImg from '../../../../assets/img/file.png';
import dirImg from '../../../../assets/img/folder.png';
import { setPopupDisplay} from "../../../../reducers/fileReducer";
import './controller.css';
import {useDispatch} from "react-redux";

const Controller = ({data}) => {
    const usedSpace = calculatePercentage(data.total, data.available);
    const [buttonPopup, setButtonPopup] = useState(false);
    const dispatch = useDispatch();

    function createButtonHandler(e) {
        e.stopPropagation();
        setButtonPopup(!buttonPopup);
    }

    function popupHandler() {
        dispatch(setPopupDisplay('flex'));
        setButtonPopup(false);
        return undefined;
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
                        <div className="button__popup__body__makedir" onClick={() => popupHandler()}>
                            <div className="button__popup__body__item">
                                <img className="button__popup__body__img" src={dirImg} alt="directory"/>
                                <span className="button__popup__body__title">Create directory</span>
                            </div>
                        </div>
                        <div className="button__popup__body__loadfile">
                           <div className="button__popup__body__item">
                               <img className="button__popup__body__img" src={fileImg} alt="file"/>
                               <span className="button__popup__body__title">Load file</span>
                           </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Controller;
import React, {useState} from 'react';
import './popup.css';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../../reducers/fileReducer";
import {createNewDirectory} from "../../../actions/file";

const PopUp = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const popupState = useSelector(state => state.files.popupDisplay)
    const currentDirectory = useSelector(state => state.files.currentDirectory)

    function createHandler() {
        dispatch(createNewDirectory(currentDirectory, inputValue));
        setInputValue('');
        dispatch(setPopupDisplay('none'));
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none')) } style={{display: popupState}}>
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Enter Name</div>
                    <div className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>×</div>
                </div>
                <div className="popup__body">
                    <input
                        type="text"
                        className="popup__input"
                        placeholder="Enter valid name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="popup__controls">
                        <button className="popup__confirm" onClick={() => createHandler()}>Create</button>
                        <button className="popup__cancel" onClick={() => dispatch(setPopupDisplay('none')) }>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
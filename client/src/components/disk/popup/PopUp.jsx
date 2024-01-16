import React, {useState} from 'react';
import './popup.css';

const PopUp = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="popup">
            <div className="popup__content">
                <div className="popup__header">
                    <div className="popup__title">Enter Name</div>
                    <div className="popup__close">×</div>
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
                        <button className="popup__confirm">Create</button>
                        <button className="popup__cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
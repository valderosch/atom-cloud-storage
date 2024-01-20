import React from 'react';
import './uploader.css';
import {useDispatch} from "react-redux";
import {removeFileFromUploader} from "../../../reducers/uploadReducer";

const UploadAtom = ({file}) => {
    const dispatch = useDispatch();
    return (
        <div className="upload-atom">
            <div className="upload-atom__header">
                <div className="upload-atom__filename">{file.filename}</div>
                <div className="upload-atom__progressbar">
                    <div className="upload-atom__progressbar__bar">
                        <div className="upload-atom__progressbar__progress" style={{width: file.progress + "%"}}/>
                    </div>
                    <div className="upload-atom__progressbar__status">{file.progress} %</div>
                </div>
                <div className="uploader__close__btn" onClick={(e) => dispatch(removeFileFromUploader(file.id))}>×</div>
            </div>
        </div>
    );
};

export default UploadAtom;
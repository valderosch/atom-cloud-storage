import React from 'react';
import './uploader.css';
import UploadAtom from "./UploadAtom";
import {useDispatch, useSelector} from "react-redux";
import {hideUploadExplorer} from "../../../reducers/uploadReducer";

const UploadExplorer = () => {
    const files = useSelector(state => state.upload.files);

    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Adding your files</div>
                <div className="uploader__close__btn" onClick={() => dispatch(hideUploadExplorer())}>×</div>
            </div>
            <div className="uploader__body">
                {files.map(file =>
                    <UploadAtom key = {file.id} file = {file}/>
                )}
            </div>
        </div>
    );
};

export default UploadExplorer;
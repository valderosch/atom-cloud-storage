import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./file/File";

const FilesList = () => {
    const data = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)

    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__img">+</div>
                <div className="filelist__title">Title</div>
                <div className="filelist__type">Type</div>
                <div className="filelist__size">Size</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__fav">Favourite</div>
            </div>
            <div className="filelist__board">
                {data}
            </div>
        </div>
    );
};

export default FilesList;
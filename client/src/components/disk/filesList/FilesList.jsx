import React from 'react';
import './fileList.css';

const FilesList = () => {
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="header__title">Title</div>
                <div className="header__type">Type</div>
                <div className="header__size">Size</div>
                <div className="header_date">Date</div>
                <div className="header__fav">Fav</div>
            </div>
        </div>
    );
};

export default FilesList;
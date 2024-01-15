import React from 'react';
import './file.css';
import fileImg from '../../../../assets/img/file.png';
import folderImg from '../../../../assets/img/folder.png';

const File = ({file}) => {
    return (
        <div className="file">
            <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="file__icon"/>
            <div className="file__title">{file.filename}</div>
            <div className="file__type">{file.filetype}</div>
            <div className="file__size">{file.size}</div>
            <div className="file__date">{file.date}</div>
        </div>
    );
};

export default File;
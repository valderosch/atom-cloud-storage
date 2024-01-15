import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./file/File";

const FilesList = () => {
    // const data = useSelector(state => state.files.files).map(file => <File/>)
    const mocks = [
        {_id:1, filename: "dirsecond", filetype: "dir", size: '55mb', date: '15.01.2024', isFav: true},
        {_id:2, filename: "passwords", filetype: "file", size: '1mb', date: '14.01.2024', isFav: true},
        {_id:3, filename: "programm111", filetype: "file", size: '130mb', date: '04.04.2023', isFav: false},
        {_id:4, filename: "counts", filetype: "file", size: '95mb', date: '05.06.2023', isFav: true},
        {_id:5, filename: "staff", filetype: "dir", size: '8mb', date: '13.01.2024', isFav: false},
    ].map(file => <File file={file} key={file.id}/>)

    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__title">Title</div>
                <div className="filelist__type">Type</div>
                <div className="filelist__size">Size</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__fav">Fav</div>
            </div>
            <div className="filelist__board">
                {mocks}
            </div>
        </div>
    );
};

export default FilesList;
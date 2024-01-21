import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FilesList from "./filesList/FilesList";
import './disk.css';
import dropImage from '../../assets/img/dragdrop.jpg';
import Explorer from "./explorer/Explorer";
import PopUp from "./popup/PopUp";
import {setDirectory, setPopupDisplay} from "../../reducers/fileReducer";
import UploadExplorer from "./uploadexplorer/UploadExplorer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);
    const [dragDrop, setDragDrop] = useState(false);
    const [filter, setFilter] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDirectory, filter));
    }, [currentDirectory, dispatch, filter])

    function returnHandler() {
        const prevDirId = directoryStack.pop();
        dispatch(setDirectory(prevDirId));
    }

    function fileUploadHandler(e) {
        const files = [...e.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragDrop(true);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragDrop(false);
    }

    function fileDropHandle(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
        setDragDrop(false)
    }

    return ( !dragDrop ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__explorer">
                <Explorer/>
            </div>
            <div className="disk__files">
                <div className="controls">
                    <div className="controls__btns">
                        <button className="button__back" onClick={() => returnHandler()}>Back</button>
                        <div className="controls__upload">
                            <label htmlFor="controls__upload__input" className="controls__upload__label">Upload File</label>
                            <input multiple={true} type="file" onChange={(e) => fileUploadHandler(e)} id="controls__upload__input" className="controls__upload__input"/>
                        </div>
                    </div>
                    <input type="text" className="searchbar" defaultValue="Search..."></input>
                    <div className="controls__filter">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter__select">
                            <option value="filename">by name</option>
                            <option value="filetype">by type</option>
                            <option value="size">by size</option>
                            <option value="date">by date</option>
                        </select>
                    </div>
                </div><br/>
                <FilesList/>
            </div>
            <PopUp/>
            <UploadExplorer/>
        </div>
            :
            <div className="dropfield" onDrop={fileDropHandle} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="dropfield__content">
                    <img src={dropImage} alt="" className="dropfield__img"/>
                    <div className="dropfield__descr">Drop Your Files Here   #inside this area</div>
                </div>
            </div>
    );
};

export default Disk;
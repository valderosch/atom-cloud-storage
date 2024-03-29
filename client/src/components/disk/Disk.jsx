import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FilesList from "./filesList/FilesList";
import './disk.css';
import dropImage from '../../assets/img/dragdrop.jpg';
import filterImage from '../../assets/img/filter.png';
import Explorer from "./explorer/Explorer";
import PopUp from "./popup/PopUp";
import {setDirectory, setViewType} from "../../reducers/fileReducer";
import UploadExplorer from "./uploadexplorer/UploadExplorer";
import BreadCrumbs from "./breadcrumbs/BreadCrumbs";


const Disk = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);
    const stack = useSelector(state => state.files.breadcrumbsStack);
    const loader = useSelector(state => state.app.loader);
    const [dragDrop, setDragDrop] = useState(false);
    const [filter, setFilter] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDirectory, filter));
    }, [currentDirectory, dispatch, filter])

    function returnHandler() {
        const prevDirId = directoryStack.pop();
        dispatch(setDirectory(prevDirId));
        stack.pop();
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

    if(loader){
        return (
            <div className="loader_wrapper">
                <div className="loader">
                </div>
            </div>
        )
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
                        <BreadCrumbs/>
                    </div>
                    <div className="controls__filter">
                        <img src={filterImage} alt="filter" className="filter__img"/>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter__select">
                            <option className='option' value="filename">name</option>
                            <option className='option' value="filetype">type</option>
                            <option className='option' value="size">size</option>
                            <option className='option' value="date">date</option>
                        </select>
                        <div className="filter__buttons">
                            <button className="filter__list" onClick={() => dispatch(setViewType('list'))}></button>
                            <button className="filter__grid" onClick={() => dispatch(setViewType('grid'))}></button>
                        </div>
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
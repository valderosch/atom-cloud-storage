import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FilesList from "./filesList/FilesList";
import './disk.css';
import dropImage from '../../assets/img/dragdrop.jpg';
import breadcrumbsSeparator from '../../assets/img/separator.svg';
import Explorer from "./explorer/Explorer";
import PopUp from "./popup/PopUp";
import {setDirectory, setViewType} from "../../reducers/fileReducer";
import UploadExplorer from "./uploadexplorer/UploadExplorer";


const Disk = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const directoryStack = useSelector(state => state.files.directoryStack);
    const loader = useSelector(state => state.app.loader);
    const [dragDrop, setDragDrop] = useState(false);
    const [filter, setFilter] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDirectory, filter));
    }, [currentDirectory, dispatch, filter])

    function returnHandler() {
        const prevDirId = directoryStack.pop();
        dispatch(setDirectory(prevDirId));
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
                        <div className="crumbs">
                            <div className="crumbs__body">
                                <div className="crumbs__element">
                                    <div className="crumbs__title">
                                        <div className="crumbs__title__text">Main</div>
                                    </div>
                                    <div className="crumbs__divider">
                                        <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator"/>
                                    </div>
                                </div>
                                <div className="crumbs__element">
                                    <div className="crumbs__title">
                                        <div className="crumbs__title__text">Images</div>
                                    </div>
                                    <div className="crumbs__divider">
                                        <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator"/>
                                    </div>
                                </div>
                                <div className="crumbs__element">
                                    <div className="crumbs__title">
                                        <div className="crumbs__title__text">Summer2018</div>
                                    </div>
                                    <div className="crumbs__divider">
                                        <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator"/>
                                    </div>
                                </div>
                                <div className="crumbs__element">
                                    <div className="crumbs__title">
                                        <div className="crumbs__title__text">July</div>
                                    </div>
                                    <div className="crumbs__divider">
                                        <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="controls__filter">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter__select">
                            <option value="filename">name</option>
                            <option value="filetype">type</option>
                            <option value="size">size</option>
                            <option value="date">date</option>
                        </select>
                        <button className="filter__list" onClick={() => dispatch(setViewType('list'))}></button>
                        <button className="filter__grid" onClick={() => dispatch(setViewType('grid'))}></button>
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
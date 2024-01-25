import React, {useState} from 'react';
import './file.css';
import fileImg from '../../../../assets/img/file.png';
import folderImg from '../../../../assets/img/folder.png';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setDirectory} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";

const File = ({file}) => {
    const [isFav, setIsFav] = useState(file.isFav);
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const fileViewType = useSelector(state => state.files.viewType);
    const [fileContext, setFileContext] = useState(false);
    let filePosition = {};

    const handleFavClick = () => {
        setIsFav(!isFav);
        // changeFavStatus();
        console.log(`FAUVORITE: ${isFav}`);
    };

    function openDirectoryHandler(file) {
        if(file.filetype === 'dir'){
            dispatch(pushToStack(currentDirectory));
            dispatch(setDirectory(file._id));
        }
    }

    function downloadHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function formatFileSize(size) {
        const KB = 1024;
        const MB = KB * 1024;
        const GB = MB * 1024;
        const TB = GB * 1024;

        switch (true) {
            case size < KB:
                return size + ' B';
            case size < MB:
                return (size / KB).toFixed(1) + ' KB';
            case size < GB:
                return (size / MB).toFixed(1) + ' MB';
            case size < TB:
                return (size / GB).toFixed(1) + ' GB';
            default:
                return (size / TB).toFixed(1) + ' TB';
        }
    }

    function deleteHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file))
    }

    function fileContextMenuHandler(e) {
        e.stopPropagation();
        setFileContext(!fileContext);

        const gridFile = e.currentTarget;
        const rect = gridFile.getBoundingClientRect();
        filePosition =({
            top: `${rect.top + window.scrollY}px`,
            left: `${rect.left + window.scrollX}px`,
        });
        console.log(filePosition);
    }

    if(fileViewType === 'list') {
        return (
            <div className="file" onClick={() => openDirectoryHandler(file)}>
                <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="file__icon"/>
                <div className="file__title">{file.filename}</div>
                <div className="file__type">{file.filetype === 'dir'? '' : file.filetype}</div>
                <div className="file__size">{file.filetype === 'dir'? '' : formatFileSize(file.size)}</div>
                <div className="file__date">{file.filetype === 'dir'? '' : file.date.slice(0,10)}</div>
                <div className="fav" onClick={event => event.stopPropagation()}>
                    <div
                        className={`file__isfav ${isFav ? 'filled' : ''}`}
                        onClick={handleFavClick}
                        role="button"
                        tabIndex={0}
                    >
                        {isFav ? '❤️' : '🤍'}️
                    </div>
                </div>
                <div className="file__options">
                    <div onClick={(e) => deleteHandler(e)} className="file__delete">RM</div>
                    {file.filetype !== 'dir' && <div onClick={(e) => downloadHandler(e) } className="file__download">DL</div>}
                </div>
            </div>

        );
    }

    if(fileViewType === 'grid') {
        return (
            <div className="grid__file" onClick={() => openDirectoryHandler(file)}>
                <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="grid__file__icon"/>
                <div className="grid__file__title">{file.filename}</div>
                <div className="grid__file__options" onClick={(e) => fileContextMenuHandler(e)}>
                    o
                </div>
                {fileContext &&
                    <div className="filecontext__content" style = {filePosition}>
                        <div className="filecontex__list">
                            {file.filetype !== 'dir' &&
                                <div className="filecontext__download">
                                    <img src="" alt="icon" className="filecontex__img"/>
                                    <div onClick={(e) => downloadHandler(e) }
                                         className="grid__file__download"> download file
                                    </div>
                                </div>
                            }
                            <div className="filecontext__rename">
                                <img src="" alt="icon" className="filecontex__img"/>
                                <div className="filecontext__description">rename {file.filetype === 'dir'? 'directory' : 'file'}</div>
                            </div>
                            <div className="filecontext__duplicate">
                                <img src="" alt="icon" className="filecontex__img"/>
                                <div className="filecontext__description">make copy</div>
                            </div>
                            <div className="filecontext__share">
                                <img src="" alt="icon" className="filecontex__img"/>
                                <div className="filecontext__description">share file</div>
                            </div>
                            <div className="filecontext__viewinfo">
                                <img src="" alt="icon" className="filecontex__img"/>
                                <div className="filecontext__description">view information</div>
                            </div>
                            <div className="filecontext__delete" onClick={(e) => deleteHandler(e)}>
                                <img src="" alt="icon" className="filecontex__img"/>
                                <div className="filecontext__description">delete {file.filetype === 'dir'? 'directory' : 'file'}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default File;
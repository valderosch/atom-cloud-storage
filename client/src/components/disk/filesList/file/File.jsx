import React, {useState} from 'react';
import './file.css';
import fileImg from '../../../../assets/img/file.png';
import folderImg from '../../../../assets/img/folder.png';
import downloadImg from '../../../../assets/img/context/download.png';
import renameImg from '../../../../assets/img/context/rename.png';
import shareImg from '../../../../assets/img/context/share.png';
import copyImg from '../../../../assets/img/context/copy.png';
import infoImg from '../../../../assets/img/context/information.png';
import deleteImg from '../../../../assets/img/context/delete.png';
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
        setFileContext(false);
        if(file.filetype === 'dir'){
            dispatch(pushToStack(currentDirectory));
            dispatch(setDirectory(file._id));
        }
    }

    function downloadHandler(e) {
        e.stopPropagation();
        downloadFile(file);
        setFileContext(false)
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
        setFileContext(false);
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
                <div className="file__fav" onClick={event => event.stopPropagation()}>
                    <div
                        className={`file__isfav ${isFav ? 'filled' : ''}`}
                        onClick={handleFavClick}
                        role="button"
                        tabIndex={0}
                    >
                        {isFav ? '❤️' : '🤍'}️
                    </div>
                </div>
                <div className="file__options" onClick={(e) => fileContextMenuHandler(e)}>
                    ∷
                </div>
                {fileContext &&
                    <div className="list__filecontext" style = {filePosition}>
                        <div className="list__filecontext__content">
                            {file.filetype !== 'dir' &&
                                <div className="list__filecontext__options">
                                    <img src={downloadImg} alt="icon" className="filecontext__img"/>
                                    <div onClick={(e) => downloadHandler(e) }
                                         className="filecontext__description"> download file
                                    </div>
                                </div>
                            }
                            <div className="list__filecontext__options" onClick={(e) => deleteHandler(e)}>
                                <img src={deleteImg} alt="icon" className="filecontext__img"/>
                                <div className="filecontext__description">delete {file.filetype === 'dir'? 'directory' : 'file'}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        );
    }

    if(fileViewType === 'grid') {
        return (
            <div className="grid__file" onClick={() => openDirectoryHandler(file)}>
                <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="grid__file__icon"/>
                <div className="grid__file__body">
                    <div className="grid__file__title">{file.filename}</div>
                    <div className="grid__file__options" onClick={(e) => fileContextMenuHandler(e)}>
                        ∷
                    </div>
                </div>
                {fileContext &&
                    <div className="filecontext" style = {filePosition}>
                        <div className="filecontext__list">
                            {file.filetype !== 'dir' &&
                                <div className="filecontext__option">
                                    <img src={downloadImg} alt="icon" className="filecontext__img"/>
                                    <div onClick={(e) => downloadHandler(e) }
                                         className="filecontext__description"> download file
                                    </div>
                                </div>
                            }
                            <div className="filecontext__option">
                                <img src={renameImg} alt="icon" className="filecontext__img"/>
                                <div className="filecontext__description">rename {file.filetype === 'dir'? 'directory' : 'file'}</div>
                            </div>
                            <div className="filecontext__option">
                                <img src={copyImg} alt="icon" className="filecontext__img"/>
                                <div className="filecontext__description">make copy</div>
                            </div>
                            <div className="filecontext__option">
                                <img src={shareImg} alt="icon" className="filecontext__img"/>
                                <div className="filecontext__description">share file</div>
                            </div>
                            <div className="filecontext__option">
                                <img src={infoImg} alt="icon" className="filecontext__img"/>
                                <div className="filecontext__description">view information</div>
                            </div>
                            <div className="filecontext__option" onClick={(e) => deleteHandler(e)}>
                                <img src={deleteImg} alt="icon" className="filecontext__img"/>
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
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
import {pushToBreadcrumbsStack, pushToStack, setDirectory} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";


const File = ({file}) => {
    const [isFav, setIsFav] = useState(file.isFav);
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);
    const fileViewType = useSelector(state => state.files.viewType);
    const [fileContext, setFileContext] = useState(false);
    const [filePosition, setFilePosition] = useState({});

    const handleFavClick = () => {
        setIsFav(!isFav);
        // changeFavStatus();
        console.log(`FAUVORITE: ${isFav}`);
    };

    function openDirectoryHandler(file) {
        setFileContext(false);
        if(file.filetype === 'dir'){
            const directoryInfo = file.filename
            dispatch(pushToStack(currentDirectory));
            dispatch(setDirectory(file._id));
            dispatch(pushToBreadcrumbsStack(directoryInfo));
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
        setFileContext(false);
        e.stopPropagation();
        setFileContext(!fileContext);
        setFilePosition({
            top: `0px`,
            left: `0px`,
            zIndex: 0,
        });

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const menuWidthPercent = 20;
        const menuHeightPercent = 50;

        const menuWidth = (menuWidthPercent / 100) * windowWidth;
        const menuHeight = (menuHeightPercent / 100) * windowHeight;

        let menuX = e.clientX - menuWidth / 2;
        let menuY = e.clientY - menuHeight / 2;

        if (menuX < 0) {
            menuX = 0;
        } else if (menuX + menuWidth > windowWidth) {
            menuX = windowWidth - menuWidth;
        }

        if (menuY < 0) {
            menuY = 0;
        } else if (menuY + menuHeight > windowHeight) {
            menuY = windowHeight - menuHeight;
        }

        setFilePosition({
            top: `${menuY-50}px`,
            left: `${menuX-180}px`,
            zIndex: 3,
        });
    }
    const ContextMenu = () => {
        return(
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
        )
    }

    function handleDrag(e, file) {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', file._id);
        console.log('DRAG StART');
    }

    function handleDragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('File entered folder');
        e.target.style.border = '1px solid black';
        e.target.style.backgroundColor = '#e1c2c2';
    }

    function handleDragLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('Drag Leaved');
        e.target.style.border = 'none';
        e.target.style.backgroundColor = 'transparent';
    }
    let timeout;
    function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log('File being dragged over folder');
        }, 200);
    }
    function handleDragDrop(e, file) {
        if (file.filetype === 'dir'){
            e.stopPropagation();
            e.preventDefault();
            console.log('Drag Drop');
            const fileId = e.dataTransfer.getData('text/plain');
            console.log('File ' + file._id + ' dropped over folder:' + fileId);
            //changeFileFolder(file);
        }
        else {
            console.log('File being dropped, but not in folder')
        }
        e.target.style.border = 'none';
        e.target.style.backgroundColor = 'transparent';
    }

    if(fileViewType === 'list') {
        return (
            <div className="file"
                 onClick={() => openDirectoryHandler(file)}
                 draggable
                 onDragStart={(e) => handleDrag(e, file)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDrop={(e) => handleDragDrop(e, file)}
            >
                <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="file__icon"/>
                <div className="file__title" onDragOver={(e) => e.stopPropagation()}>{file.filename}</div>
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
                    <ContextMenu/>
                }
            </div>

        );
    }

    if(fileViewType === 'grid') {
        return (
            <div className="grid__file" onClick={() => openDirectoryHandler(file)}
                 draggable
                 onDragStart={(e) => handleDrag(e, file)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDrop={(e) => handleDragDrop(e, file)}
            >
                <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="grid__file__icon"/>
                <div className="grid__file__body">
                    <div className="grid__file__title">{file.filename}</div>
                    <div className="grid__file__options" onClick={(e) => fileContextMenuHandler(e)}>
                        ∷
                    </div>
                </div>
                {fileContext &&
                    <ContextMenu/>
                }
            </div>
        );
    }
};

export default File;
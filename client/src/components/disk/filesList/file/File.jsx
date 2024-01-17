import React, {useState} from 'react';
import './file.css';
import fileImg from '../../../../assets/img/file.png';
import folderImg from '../../../../assets/img/folder.png';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setDirectory} from "../../../../reducers/fileReducer";
//import Heart from 'react-animated-heart';

const File = ({file}) => {
    const [isFav, setIsFav] = useState(file.isFav);
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory);

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

    return (
        <div className="file" onClick={() => openDirectoryHandler(file)}>
            <img src={file.filetype === 'dir' ? folderImg : fileImg} alt="file" className="file__icon"/>
            <div className="file__title">{file.filename}</div>
            <div className="file__type">{file.filetype === 'dir'? '' : file.filetype}</div>
            <div className="file__size">{file.filetype === 'dir'? '' : file.size}</div>
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
            {/*<Heart classname="file__isfav" isClick={isFav} onClick={setIsFav}/>*/}
        </div>
    );
};

export default File;
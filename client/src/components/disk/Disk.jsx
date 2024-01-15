import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import FilesList from "./filesList/FilesList";
import './disk.css';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory)

    useEffect(() => {
        dispatch(getFiles(currentDirectory));
    }, [currentDirectory])

    return (
        <div className="disk">
            <div className="controls">
               <div className="controls__btns">
                   <button className="button__back">Back</button>
                   <button className="button__newdir">Create Directory +</button>
               </div>
                <div className="controls__filter">
                    -=-
                </div>
            </div><br/>
          DISk
            <FilesList/>
        </div>
    );
};

export default Disk;
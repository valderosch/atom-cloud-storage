import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createNewDirectory, getFiles} from "../../actions/file";
import FilesList from "./filesList/FilesList";
import './disk.css';
import Explorer from "./explorer/Explorer";
import PopUp from "./popup/PopUp";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(state => state.files.currentDirectory)

    useEffect(() => {
        dispatch(getFiles(currentDirectory));
    }, [currentDirectory, dispatch])

    function createDirHandler() {
        dispatch(createNewDirectory(currentDirectory, 'papka'))
        return undefined;
    }

    return (
        <div className="disk">
            <div className="disk__explorer">
                <Explorer/>
            </div>
            <div className="disk__files">
                <div className="controls">
                    <div className="controls__btns">
                        <button className="button__back">Back</button>
                        <button className="button__newdir" onClick={() => createDirHandler()}>newdir</button>
                    </div>
                    <input type="text" className="searchbar" defaultValue="Search..."></input>
                    <div className="controls__filter">
                        -=-
                    </div>
                </div><br/>
                <FilesList/>
            </div>
            <PopUp/>
        </div>
    );
};

export default Disk;
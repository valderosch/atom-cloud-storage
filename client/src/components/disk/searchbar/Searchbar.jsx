import React, {useState} from 'react';
import './searchbar.css';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFiles} from "../../../actions/file";
import {showAppLoader} from "../../../reducers/appReducer";

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const currentDirectory = useSelector(state => state.files.currentDirectory)
    const dispatch = useDispatch();

    function searchbarChangeHandler(e){
        setSearchValue(e.target.value);
        if(searchTimeout !== false) {
            clearTimeout(e.target.value);
        }
        dispatch(showAppLoader());
        if(e.target.value !== ''){
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(searchValue));
            }, 500))
        } else {
            dispatch(getFiles(currentDirectory));
        }
    }

    return (
        <div className="searchbar">
            <input
                type="text"
                className="searchbar__input"
                value={searchValue}
                onChange={e => searchbarChangeHandler(e)}
                placeholder="Search files . . ."
            ></input>
        </div>
    );
};

export default Searchbar;
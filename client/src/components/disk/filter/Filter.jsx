import React, {useEffect, useState} from 'react';
import {getFiles} from "../../../actions/file";
import {useDispatch} from "react-redux";
import './filter.css';
import {setViewType} from "../../../reducers/fileReducer";


const Filter = () => {
    const [filter, setFilter] = useState('type');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles(filter));
    }, [dispatch, filter])

    return (
        <div className="filter">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter__select">
                <option value="filename">by name</option>
                <option value="filetype">by type</option>
                <option value="size">by size</option>
                <option value="date">by date</option>
            </select>
            <button className="filter__list" onClick={() => dispatch(setViewType('list'))}></button>
            <button className="filter__grid" onClick={() => dispatch(setViewType('grid'))}></button>
        </div>
    );
};

export default Filter;
import React, {useEffect, useState} from 'react';
import {getFiles} from "../../../actions/file";
import {useDispatch} from "react-redux";
import './filter.css';
import {setViewType} from "../../../reducers/fileReducer";


const Filter = () => {
    const [filter, setFilter] = useState('type');
    const [activeView, setActiveView] = useState('list');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles(filter));
    }, [dispatch, filter])

    function handleViewType(viewType) {
        dispatch(setViewType(viewType));
        setActiveView(viewType);
    }

    return (
        <div className="filter">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter__select">
                <option value="filename">name</option>
                <option value="filetype">type</option>
                <option value="size">size</option>
                <option value="date">date</option>
            </select>
            <button className="filter__list" onClick={() => handleViewType('list')}
            style={activeView === 'list' ? {border: '#424242'} : {border: '#f2f2f2'}}></button>
            <button className="filter__grid" onClick={() => handleViewType('grid')}></button>
        </div>
    );
};

export default Filter;
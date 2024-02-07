import React from 'react';
import './assidefilelist.css';
import mockStructure from './datamock';
import Folder from "./folder/Folder";
import {useSelector} from "react-redux";



const AsideFilesList = () => {
    const files = useSelector(state => state.files.files);
    return (
        <div className='aside-files-list'>
            <h3 className='aside__title'>Your Cloud</h3>
            {files.map((item) => (
                <Folder className="aside__item__true" key={item._id} name={item.filename} content={item.childs} type={item.filetype}/>
            ))}
        </div>
    );
};

export default AsideFilesList;
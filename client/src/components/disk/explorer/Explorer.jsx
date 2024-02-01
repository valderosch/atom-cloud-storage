import React, {useEffect} from 'react';
import './explorer.css';
import Controller from "./controller/Controller";
import AsideFilesList from "./assidefiles/AsideFilesList";
import {useSelector} from "react-redux";

const Explorer = () => {
    // 1024**3*10
    const maxsize = 1024**3;
    const data = useSelector(state => state.files.files)

    const calculateTotalSize = (files) => {
        const filesArray = Object.values(files);
        const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);
        return { total: totalSize };
    };

    const usedSize = calculateTotalSize(data);
    const load_data = {total: usedSize.total, available:maxsize }

    return (
        <div className="explorer">
            <div className="explorer__controls">
                <Controller data={load_data}/>
            </div>
            <div className="explorer__content">
                <AsideFilesList/>
            </div>
        </div>
    );
};

export default Explorer;
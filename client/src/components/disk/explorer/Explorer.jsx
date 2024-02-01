import React from 'react';
import './explorer.css';
import Controller from "./controller/Controller";
import AsideFilesList from "./assidefiles/AsideFilesList";

const Explorer = () => {
    const load_data = {total: 1000000000, available:5000000000 }


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
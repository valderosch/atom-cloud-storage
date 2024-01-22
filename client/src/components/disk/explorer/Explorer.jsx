import React from 'react';
import './explorer.css';
import Controller from "./controller/Controller";

const Explorer = () => {
    const data = {total: 1000000000, available:5000000000 }


    return (
        <div className="explorer">
            <div className="explorer__controls">
                <Controller data={data}/>
            </div>
            <div className="explorer__content">
                а
            </div>
        </div>
    );
};

export default Explorer;
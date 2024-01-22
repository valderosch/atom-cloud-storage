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
                - Fauvorites<br/>
                - DISK<br/>
                    |_ folder1<br/>
                    |_ folder2<br/>
                    |_picture.png<br/>
            </div>
        </div>
    );
};

export default Explorer;
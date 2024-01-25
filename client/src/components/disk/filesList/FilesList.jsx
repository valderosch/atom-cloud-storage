import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./file/File";
import nodata from '../../../assets/img/search.jpg';

const FilesList = () => {
    const data = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)
    const fileViewType = useSelector(state => state.files.viewType);

    if (data.length === 0){
        return(
            <div className="nodata">
                <div className="nodata__content">
                    <img src={nodata} alt="no files" className="nodata__img"/>
                    <div className="nodata__info">
                        We can`t find any file here<br/>
                        Search anywhere else<br/>
                        <p className="nodata__info__error">
                            no files Error./
                        </p><br/><br/>
                        <p className="nodata__info__hint">
                            Maybe you want to add <a href="/">some</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (fileViewType === 'list'){
        return (
            <div className="filelist">
                <div className="filelist__types">
                    <div className="docs">
                        <img src="" alt="docs" className="docs_img"/>
                    </div>
                    <div className="images">
                        <img src="" alt="images" className="images_img"/>
                    </div>
                    <div className="videos">
                        <img src="" alt="videos" className="videos_img"/>
                    </div>
                    <div className="other">
                        <img src="" alt="other" className="other_img"/>
                    </div>
                </div>
                <div className="filelist__header">
                    <div className="filelist__img">+</div>
                    <div className="filelist__title">Title</div>
                    <div className="filelist__type">Type</div>
                    <div className="filelist__size">Size</div>
                    <div className="filelist__date">Date</div>
                    <div className="filelist__fav">Favourite</div>
                </div>
                <div className="filelist__board">
                    {data}
                </div>
            </div>
        );
    }
    if(fileViewType === 'grid'){
        return (
            <div className="filegrid">
                <div className="filegrid__board">
                    {data}
                </div>
            </div>
        );
    }
};

export default FilesList;
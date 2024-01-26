import React from 'react';
import './fileList.css';
import {useSelector} from "react-redux";
import File from "./file/File";
import nodata from '../../../assets/img/search.jpg';
import docsImg from '../../../assets/img/categories/documents.png';
import mediaImg from '../../../assets/img/categories/mediacontent.png';
import videoImg from '../../../assets/img/categories/video.png';
import otherImg from '../../../assets/img/categories/other2.png';

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
                <div className="files__types">
                    <div className="docs">
                        <img src={docsImg} alt="docs" className="docs_img"/>
                        <div className="docs_title">Documents</div>
                    </div>
                    <div className="images">
                        <img src={mediaImg} alt="images" className="images_img"/>
                        <div className="img_title">Images</div>
                    </div>
                    <div className="videos">
                        <img src={videoImg} alt="videos" className="videos_img"/>
                        <div className="videos_title">Videos</div>
                    </div>
                    <div className="other">
                        <img src={otherImg} alt="other" className="other_img"/>
                        <div className="other_title">Other</div>
                    </div>
                </div>
                <hr className='horizontal_line'/>
                <div className="filegrid__board">
                    {data}
                </div>
            </div>
        );
    }
};

export default FilesList;
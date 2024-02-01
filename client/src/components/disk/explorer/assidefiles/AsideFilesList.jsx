import React, { useState } from 'react';
import './assidefilelist.css';
import mockStructure from './datamock';
import folderImg from '../../../../assets/img/folder.png';
import fileImg from '../../../../assets/img/file.png';

const Folder = ({ name, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasContent = content && content.some((item) => item.type === 'folder' || item.type === 'file');

    const handleToggle = () => {
        if (hasContent) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <div className="root" onClick={handleToggle}>
                <div className="pointer">{hasContent && (isOpen ? '-' : '+')}</div>
                <img src={hasContent ? folderImg : fileImg} alt="folder" className="item__img"/>
                <div className="text__wrap">
                    {name}
                </div>
            </div>
            {isOpen && hasContent && (
                <ul>
                    {content.map((item) => (
                        <li key={item.name}>
                            {item.type === 'folder' ? (
                                <Folder className="aside__item__true" name={item.name} content={item.content} />
                            ) : (
                                <div className="aside__item__null">
                                    <img src={item.type === 'folder' ? folderImg : fileImg} alt="img" className="file__img"/>
                                    <div className="text__wrap">
                                        {item.name}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const AsideFilesList = () => {
    return (
        <div className='aside-files-list'>
            <h3 className='aside__title'>Your Cloud</h3>
            <Folder className='aside__fav' name={'Fauvorites'} content={[
                { name: 'Secret.mp4', type: 'file' },
                { name: 'Expo.txt', type: 'file' },
            ]}/>
            <hr className='hr'/>
            {mockStructure.map((item) => (
                <Folder className="aside__item__true" key={item.name} name={item.name} content={item.content} isOpen={true}/>
            ))}
        </div>
    );
};

export default AsideFilesList;
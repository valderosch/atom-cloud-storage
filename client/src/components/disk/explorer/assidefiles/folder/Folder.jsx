import React, {useState} from "react";
import folderImg from "../../../../../assets/img/folder.png";
import fileImg from "../../../../../assets/img/file.png";
import '../assidefilelist.css';

const Folder = ({ name, content, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = type === 'folder';
    const hasContent = content && content.length > 0;

    const handleToggle = () => {
        if (hasContent) {
            // setIsOpen(!isOpen);
            console.log('EXPLORER Needs refactor on server');
        }
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const formatName = truncateText(name, 20);

    return (
        <div>
            <div className="root" onClick={handleToggle}>
                <div className="pointer">{hasContent && (isOpen ? '-' : '+')}</div>
                <img src={hasContent ? folderImg : fileImg} alt={hasContent ? 'folder' : 'file'} className="item__img"/>
                <div className="text__wrap">
                    {formatName}
                </div>
            </div>
            {isOpen && hasContent && (
                <ul>
                    {content.map((item) => (
                        <li key={item._id}>
                            <Folder className="aside__item__true" name={item.filename} content={item.childs} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Folder;
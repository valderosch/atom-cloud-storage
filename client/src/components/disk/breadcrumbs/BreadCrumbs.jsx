import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import breadcrumbsSeparator from '../../../assets/img/separator.svg';
import {popFromBreadcrumbsStack, popFromStack, setDirectory} from "../../../reducers/fileReducer";
import './breadcrumbs.css';

const BreadCrumbs = () => {
    const dispatch = useDispatch();
    const stack = useSelector(state => state.files.breadcrumbsStack);
    const directoryStack = useSelector(state => state.files.directoryStack);

    const handleRootClick = () => {
        dispatch(setDirectory(null));
        dispatch(popFromStack([]));
        dispatch(popFromBreadcrumbsStack([]));
    };

    const handleBreadcrumbClick = (event ,index) => {
        const updatedStack = directoryStack.slice(0, index + 1);
        dispatch(popFromStack(updatedStack));
        const updatedNameStack = stack.slice(0, index + 1);
        dispatch(popFromBreadcrumbsStack(updatedNameStack));
        dispatch(setDirectory(updatedStack[index + 1]));
    }

    return (
        <div className='crumbs'>
            <div className="crumbs__body">
                {directoryStack.length > 0 ? (
                        <div className='crumbs__wrapper'>
                            <div className="crumbs__element">
                                <div className="crumbs__title" onClick={handleRootClick}>
                                    <div className="crumbs__title__text"># All files</div>
                                </div>
                                <div className="crumbs__divider">
                                    <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator" />
                                </div>
                            </div>
                            {directoryStack.map((folder, index) => (
                                <div className="crumbs__element" key={index}>
                                    <div className="crumbs__title" onClick={(event) => handleBreadcrumbClick(event, index)}>
                                        <div className="crumbs__title__text">{stack[index]}</div>
                                    </div>
                                    {index < stack.length - 1 && (
                                        <div className="crumbs__divider">
                                            <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                ) : (
                    <div className="crumbs__element">
                        <div className="crumbs__title" onClick={handleRootClick}>
                            <div className="crumbs__title__text"># All files</div>
                        </div>
                        <div className="crumbs__divider">
                            <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default BreadCrumbs;
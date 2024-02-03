import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import breadcrumbsSeparator from '../../../assets/img/separator.svg';
import {popFromStack} from "../../../reducers/fileReducer";

const BreadCrumbs = () => {
    const dispatch = useDispatch();
    const directoryStack = useSelector(state => state.files.directoryStack);
    console.log('DIR STACK');
    console.log(directoryStack);

    const handleBreadcrumbClick = (index) => {
        const updatedStack = directoryStack.slice(0, index + 1);
        dispatch(popFromStack(updatedStack));
    }

    return (
        <div className='crumbs'>
            <div className="crumbs__body">
                {directoryStack.length > 0 ? (
                    directoryStack.map((folder, index) => (
                        <div className="crumbs__element" key={index}>
                            <div className="crumbs__title" onClick={() => handleBreadcrumbClick(index)}>
                                <div className="crumbs__title__text">{folder}</div>
                            </div>
                            {index < directoryStack.length - 1 && (
                                <div className="crumbs__divider">
                                    <img src={breadcrumbsSeparator} alt="separator" className="crumbs__separator" />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="crumbs__element">
                        <div className="crumbs__title">
                            <div className="crumbs__title__text"># All files</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default BreadCrumbs;
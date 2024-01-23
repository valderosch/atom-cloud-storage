import axios from "axios";
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addFileToUploader, changeUploadPercent, showUploadExplorer} from "../reducers/uploadReducer";
import {hideAppLoader, showAppLoader} from "../reducers/appReducer";

const host = 'http://localhost';
const port = '5000';

export function getFiles(dirId, filter){
    return async dispatch => {
        try{
            dispatch(showAppLoader())
            let url = `${host}:${port}/api/files`;
            if(dirId){
                url = `${host}:${port}/api/files?parent=${dirId}`;
            }
            if(filter){
                url = `${host}:${port}/api/files?sort=${filter}`;
            }
            if(dirId && filter){
                url = `${host}:${port}/api/files?parent=${dirId}&sort=${filter}`;
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}
            });
            dispatch(setFiles(response.data));
            console.log(response.data);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        } finally {
            dispatch(hideAppLoader());
        }
    }
}

export function createNewDirectory(dirId, dirName){
    return async dispatch => {
        try{
            const response = await axios.post(`${host}:${port}/api/files`,{
                filename: dirName,
                parent: dirId,
                filetype: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}
            });
            dispatch(addFile(response.data));
            console.log(response.data);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        }
    }
}

export function uploadFile(file, dirId){
    return async dispatch => {
        try{
            const formData = new FormData();
            formData.append('file', file);

            if(dirId){
                formData.append('parent', dirId)
            }

            const uploadFile = {
                filename: file.name,
                progress: 0,
                id: Date.now()
            }
            dispatch(showUploadExplorer())
            dispatch(addFileToUploader(uploadFile))

            const response = await axios.post(`${host}:${port}/api/files/upload`, formData,  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadPercent(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data));
            console.log(response.data);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        }
    }
}

export async function downloadFile(file){
    const response = await fetch(`${host}:${port}/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
   if(response.status === 200){
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.filename;
        document.body.appendChild(link)
        link.click();
        link.remove();
   }
}

export function deleteFile(file){
    return async dispatch => {
        try{
            const response = await axios.delete(`${host}:${port}/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        }
    }
}

export function searchFiles(searchValue){
    return async dispatch => {
        try{
            const response = await axios.get(`${host}:${port}/api/files/search?search=${searchValue}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        } finally {
            dispatch(hideAppLoader());
        }
    }
}
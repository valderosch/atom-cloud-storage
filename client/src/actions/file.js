import axios from "axios";
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addFileToUploader, showUploadExplorer} from "../reducers/uploadReducer";

const host = 'http://localhost';
const port = '5000';

export function getFiles(dirId){
    return async dispatch => {
        try{
            const responce = await axios.get(`${host}:${port}/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}
            });
            dispatch(setFiles(responce.data));
            console.log(responce.data);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        }
    }
}

export function createNewDirectory(dirId, dirName){
    return async dispatch => {
        try{
            const responce = await axios.post(`${host}:${port}/api/files`,{
                filename: dirName,
                parent: dirId,
                filetype: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}
            });
            dispatch(addFile(responce.data));
            console.log(responce.data);
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
                name: file.filename,
                progress: 0,
            }
            dispatch(showUploadExplorer())
            dispatch(addFileToUploader(uploadFile))

            const responce = await axios.post(`${host}:${port}/api/files/upload`, formData,  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addFile(responce.data));
            console.log(responce.data);
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
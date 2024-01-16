import axios from "axios";
import {addFile, setFiles} from "../reducers/fileReducer";

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
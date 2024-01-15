import axios from "axios";

const host = 'http://localhost';
const port = '5000';

export function getFiles(dirId){
    return async dispatch => {
        try{
            const responce = await axios.get(`${host}:${port}/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}
            });
            console.log(responce.data);
        } catch (e) {
            alert(e.response.data.message);
            console.log(e.response.data.message);
        }
    }
}
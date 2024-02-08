import axios from "axios";
import {setUser} from "../reducers/userReducer";
import {useSelector} from "react-redux";

const host = 'http://localhost';
const port = '5000';

export const registration = async (email, password) => {
   try{
       const response = await axios.post(`${host}:${port}/api/auth/registration`, {
           email,
           password
       });
       console.log(response.data.message);
   } catch (e) {
        alert(e.res.data.message);
        console.log(e.res.data.message);
   }
}

export const authorisation = (email, password) => {
    return async dispatch => {
        try{
            const response = await axios.post(`${host}:${port}/api/auth/login`, {
                email,
                password
            });
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.res.data.message);
        }
    }
}

export const authentication = () => {
    let user = {}
    return async dispatch => {
        try{
            const response = await axios.get(`${host}:${port}/api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            user = response.data.user
            return user;
        } catch (e) {
            alert(e.res.data.message);
            console.log(e.res.data.message);
            localStorage.removeItem('token');
        }
    }
}

export const uploadUserAvatar = (file) => {
    return async dispatch => {
        try{
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${host}:${port}/api/files/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data));
            console.log('UPLOADED AVATAR');
        } catch (e) {
            console.log(e.res.data.message);
        }
    }
}

export const removeUserAvatar = () => {
    return async dispatch => {
        try{
            const response = await axios.delete(`${host}:${port}/api/files/avatar`,
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data));
            console.log('DELETED AVATAR');
        } catch (e) {
            console.log(e.res.data.message);
        }
    }
}
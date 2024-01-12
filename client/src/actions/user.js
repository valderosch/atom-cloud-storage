import axios from "axios";
import {setUser} from "../reducers/userReducer";

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
            console.log(response.data);
        } catch (e) {
            alert(e.res.data.message);
        }
    }
}

export const authentication = () => {
    return async dispatch => {
        try{
            const response = await axios.get(`${host}:${port}/api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            console.log("1) GET Request to auth");
            dispatch(setUser(response.data.user));
            console.log("2) Set dispatch");
            localStorage.setItem('token', response.data.token);
            console.log("3) Token setted to user");
            console.log(response.data);
        } catch (e) {
            alert(e.res.data.message);
            console.log(e.res.data.message);
            localStorage.removeItem('token');
        }
    }
}
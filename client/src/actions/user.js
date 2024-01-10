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
            console.log(e.res.data.message);
        }
    }
}
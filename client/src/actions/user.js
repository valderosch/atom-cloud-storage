import axios from "axios";

const host = 'http://localhost';
const port = '5000';
export const registration = async (email, password) => {
   try{
       const response = await axios.post(`${host}:${port}/api/auth/registration`, {
           email,
           password
       });
       alert(response.data.message);
   } catch (e) {
        alert(e);
        console.log(e);
   }
}
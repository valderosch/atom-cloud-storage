import React, {useState} from 'react';
import './neRegistration.css';
import Input from "../input/Input";
import {useDispatch} from "react-redux";
import {authorisation} from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="auth_block">
            <h3 className="auth_label">
                Authorisation
            </h3>
            <Input value={email} setValue={setEmail} type="text" placeholder="Email"/>
            <Input value={password} setValue={setPassword} type="text" placeholder="Password"/>
            <button className="login_button" onClick={()=> dispatch(authorisation(email, password))}>Login</button>
        </div>
    );
};

export default Login;
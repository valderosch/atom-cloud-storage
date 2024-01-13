import React, {useState} from 'react';
import './Registration.less';
import './neRegistration.css'
import Input from "../input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    return (
        <div className="auth_block">
            <h3 className="auth_label">
                Registration
            </h3>
            <Input value={name} setValue={setName} type="text" placeholder="Name"/>
            <Input value={email} setValue={setEmail} type="text" placeholder="Email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Confirm password"/>
            <button className="register_button" onClick={() => registration(email, password)}>Register</button>
        </div>
    );
};

export default Registration;
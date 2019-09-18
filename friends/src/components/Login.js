import React, { useState } from 'react';
import axios from 'axios';

export default function Login (props) {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    });
    const [loginStatus, setLoginStatus] = useState('');
    
    function handleChange(e){
        setCreds({...creds, [e.target.name]: e.target.value });
    }

    function login(e){
        e.preventDefault();
        axios
            .post(' http://localhost:5000/api/login', creds)
            .then(res => {
                // console.log(res)
                localStorage.setItem('token', res.data.payload);
                setCreds({
                    username: '',
                    password: ''
                });
                setLoginStatus('OK then, welcome friend');
                props.history.push("/protected");
            })
            .catch(err => {
                console.log(err.response.data.error);
                setLoginStatus(err.response.data.error);
                setCreds({
                    username: '',
                    password: ''
                })
            });
    }
    
    return (
        <div className= "forme">
            <h1>THIS APP IS FOR CERTIFIED ONLY</h1>
            
                
            
            <form onSubmit={login}>
                <label htmlFor="username">Username: 
                <br/>
                <input
                    type="text"
                    name="username"
                    value={creds.username}
                    onChange={handleChange}
                />
                </label>
                <br/>
                <label htmlFor="password">Password: 
                <br/>
                <input 
                    type="password"
                    name="password"
                    value={creds.password}
                    onChange={handleChange}
                />
                </label>
                <br/>
                <button >LOGIN</button>
                <p>{loginStatus}</p>
            </form>
        </div>
    );
    

}

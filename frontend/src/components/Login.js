import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);

        axios.post("http://localhost:8085/login", params)
            .then((response) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate("/home");
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setError("Invalid username and password.");
                } else {
                    console.log(error.message);
                }
            });
    };

    return (
        <div className='d-flex flex-column' style={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input type="username" 
                    className="form-control" 
                    id="username" 
                    onChange={handleChange} 
                    value={userDetails.username} 
                    name="username" 
                    placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="password" 
                    value={userDetails.password} 
                    onChange={handleChange} 
                    name="password" 
                    placeholder="Password" />
                </div>
                <div className='form-group'>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <p>Don't have an account yet? <a href='/register'>Create an account here</a>!</p>
            </form>
        </div>
    )
}

export default Login
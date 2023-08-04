import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/Login.css';

function Login() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [error, setError] = useState('');
    const { t, i18n } = useTranslation();
    const [formError, setFormError] = useState({
        username: '',
        password: ''
    });
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const newFormErrors = {};
        if (userDetails.username.trim() === '') {
            newFormErrors.username = t('Username cannot be empty.1')
        }
        if (userDetails.password.trim() === '') {
            newFormErrors.password = t('Password cannot be empty.1')
        }
        setFormError(newFormErrors);
        if (Object.keys(newFormErrors).length > 0) {
            return;
        }

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

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    });

    return (
        <div className='login-body'>
            <div className='login-left'>
                <header className='text-center'>
                    <h3>{t('Welcome back.1')}</h3>
                    <p>{t('Welcome to the Login Registration System Please enter your account details to begin.1')}</p>
                </header>
                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                    <div className="form-group">
                        <label for="username">{t('Username.1')}</label>
                        <input type="username"
                            className="form-control"
                            id="username"
                            onChange={handleChange}
                            value={userDetails.username}
                            name="username"
                            placeholder={t('Username.1')} />
                    </div>
                    {formError.username && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.username}
                        </div>
                    )}
                    <div className="form-group">
                        <label for="password">{t('Password.1')}</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            name="password"
                            placeholder={t('Password.1')}/>
                    </div>
                    {formError.password && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.password}
                        </div>
                    )}
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                        </div>
                    )}
                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary" style={{width: '20rem'}}>{t('Login.1')}</button>
                    </div>
                    <p className='text-center'>{t('Dont have an account yet.1')} <br/>
                    <a href='/register' className='register-link'>{t('Create an account here.1')}</a></p>
                </form>
            </div>
            <div className='login-right'>
                <img src={require('./assets/login.png')}/>
            </div>
        </div>
    )
}

export default Login
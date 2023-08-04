import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/Register.css';

function Register() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        created_on: new Date()
    })
    const [formError, setFormError] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        password: ''
    });
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const newFormErrors = {};
        if (user.username.trim() === '') {
            newFormErrors.username = t('Username cannot be empty.1'); 
          }
          if (user.first_name.trim() === '') {
            newFormErrors.first_name = t('First Name cannot be empty.1'); 
          }
          if (user.last_name.trim() === '') {
            newFormErrors.last_name = t('Last Name cannot be empty.1'); 
          }
          if (user.email.trim() === '') {
            newFormErrors.email = t('Email cannot be empty.1'); 
          }
          if (user.gender.trim() === '') {
            newFormErrors.gender = t('Gender cannot be empty.1'); 
          }
          if (user.password.trim() === '') {
            newFormErrors.password = t('Password cannot be empty.1');
          }
        setFormError(newFormErrors);
        if (Object.keys(newFormErrors).length > 0) {
            return;
        }
        axios.post('http://localhost:8085/register', user)
            .then((response) => {
                setUser({ ...user, first_name: '', last_name: '', username: '', email: '', password: '', gender: '' })
                navigate('/login');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    console.error("Error creating user: ", error);
                }
            })
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    });

    return (
        <div className='register-body'>
            <div className='register-left'>
                <header className='text-center'>
                    <h3>
                    {t('Join the family.1')}
                    </h3>
                    <p>{t('Begin your journey here and enter your account details to create an account.1')}</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="userName">{t('Username.1')}</label>
                        <input type="text"
                            className="form-control"
                            id="userName"
                            placeholder={t('Username.1')}
                            name='username'
                            onChange={handleChange}
                            value={user.username} />
                    </div>
                    {formError.username && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.username}
                        </div>
                    )}

                    <div className="form-group">
                        <label for="firstName">{t('First Name.1')}</label>
                        <input type="text"
                            className="form-control"
                            id="firstName"
                            placeholder={t('First Name.1')}
                            name='first_name'
                            onChange={handleChange}
                            value={user.first_name} />
                    </div>
                    {formError.first_name && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.first_name}
                        </div>
                    )}

                    <div className="form-group">
                        <label for="lastName">{t('Last Name.1')}</label>
                        <input type="text"
                            className="form-control"
                            id="lastName"
                            placeholder={t('Last Name.1')}
                            name='last_name'
                            onChange={handleChange}
                            value={user.last_name} />
                    </div>
                    {formError.last_name && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.last_name}
                        </div>
                    )}

                    <div className="form-group">
                        <label for="emailAddress">{t('Email.1')}</label>
                        <input type="email"
                            className="form-control" id="emailAddress"
                            placeholder={t('Email.1')}
                            name='email'
                            onChange={handleChange}
                            value={user.email} />
                    </div>
                    {formError.email && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.email}
                        </div>
                    )}

                    <div className='form-group'>
                        <label for='gender'>{t('Gender.1')}</label>
                        <select className="custom-select"
                            id='gender'
                            name='gender'
                            onChange={handleChange}
                            value={user.gender}>
                            <option value=''>{t('Select Gender.1')}</option>
                            <option value="Female">{t('Female.1')}</option>
                            <option value="Male">{t('Male.1')}</option>
                        </select>
                    </div>
                    {formError.gender && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.gender}
                        </div>
                    )}

                    <div className="form-group">
                        <label for="password">{t('Password.1')}</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder={t('Password.1')}
                            name='password'
                            onChange={handleChange}
                            value={user.password} />
                    </div>
                    {formError.password && (
                        <div className='alert alert-danger' roler='alert'>
                            {formError.password}
                        </div>
                    )}

                    {
                        error && (
                            <div className='alert alert-danger' role='alert'>
                                {error}
                            </div>
                        )
                    }

                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary" style={{fontSize: '13px'}}>{t('Create an Account.1')}</button>
                    </div>
                    <p className='text-center'>{t('Already have an account.1')} <a href='/login' className='login-link'>{t('Login.1')}</a>!</p>

                </form>
            </div>
            <div className='register-right'>
                <img src={require('./assets/register.png')}/>
            </div>
        </div>
    )
}

export default Register
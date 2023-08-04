import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        created_on: new Date()
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8085/register', user)
            .then((response) => {
                setUser({ ...user, first_name: '', last_name: '', username: '', email: '', password: '', gender: '' })
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error creating user: ", error);
            })
    }

    return (
        <div className='d-flex flex-column' style={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="userName">Username</label>
                    <input type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Username"
                        name='username'
                        onChange={handleChange}
                        value={user.username} />
                </div>

                <div className="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        name='first_name'
                        onChange={handleChange}
                        value={user.first_name} />
                </div>

                <div className="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        name='last_name'
                        onChange={handleChange}
                        value={user.last_name} />
                </div>

                <div className="form-group">
                    <label for="emailAddress">Email address</label>
                    <input type="email"
                        className="form-control" id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name='email'
                        onChange={handleChange}
                        value={user.email} />
                    <small id="emailHelp"
                        className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className='form-group'>
                    <label for='gender'>Gender</label>
                    <select className="custom-select"
                        id='gender'
                        name='gender'
                        onChange={handleChange}
                        value={user.gender}>
                        <option defaultValue>Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>

                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name='password'
                        onChange={handleChange}
                        value={user.password} />
                </div>


                <div className='form-group'>
                    <button type="submit" className="btn btn-primary">Create an Account</button>
                </div>
                <p>Already have an account? <a href='/login'>Log in</a>!</p>

            </form>
        </div>
    )
}

export default Register
import React, { useEffect } from 'react'
import './css/Navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user')
        navigate('/');
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        };
    }, [])

    return (
        <nav className='navbar'>
            <a className='navbar-brand' href='/'>LGS</a>
            {isLoggedIn ?
                (<ul className="navbar-nav mr-auto">
                    {user.manager === true ? 
                    (<li className='nav-item'>
                        <a className='nav-link' href='/adminpanel'>Admin Panel</a>
                    </li>) 
                    : null}
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                </ul>) :
                (<ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                </ul>)
            }

            <div className="btn-group dropleft">
                <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fi fi-ss-language"></i>
                    <span> Language</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
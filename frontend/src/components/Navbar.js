import React, { useEffect } from 'react'
import './css/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user')
        navigate('/');
    }

    function handleClick(lang) {
        i18n.changeLanguage(lang);
    }

    return (
        <nav className='navbar'>
            <a className='navbar-brand' href='/'>LGS</a>
            {isLoggedIn ?
                (<ul className="navbar-nav mr-auto">
                    {user.manager === true ?
                        (<li className='nav-item'>
                            <a className='nav-link' href='/admin'>{t('Admin Panel.1')}</a>
                        </li>)
                        : null}
                    <li className='nav-item'>
                        <a className='nav-link' href='/home'>{t('Home.1')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>{t('Logout.1')}</a>
                    </li>
                </ul>) :
                (<ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">{t('Login.1')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">{t('Register.1')}</a>
                    </li>
                </ul>)
            }

            <div class="dropdown">
                <button class="language-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fi fi-br-language"></i>
                    Language
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" onClick={() => handleClick('en')}>English</a>
                    <a class="dropdown-item" onClick={() => handleClick('chi')}>Chinese</a>
                    <a class="dropdown-item" onClick={() => handleClick('ko')}>Korean</a>
                </div>
            </div>

            {/* <div className="btn-group dropleft">
                <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fi fi-ss-language"></i>
                    <span> Language</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={() => handleClick('en')}>English</a>
                    <a className="dropdown-item" onClick={() => handleClick('chi')}>Chinese</a>
                    <a className="dropdown-item" onClick={() => handleClick('ko')}>Korean</a>
                </div>
            </div> */}
        </nav >
    )
}

export default Navbar
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/LandingPage.css';

function LandingPage() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  });
  
  return (
    <div className='d-flex flex-column' style={{ padding: '3rem' }}>
      <div className='landing-body'>
        <h1 className='welcome-h1'>
          {t('Welcome this is a login and registration system built using Java Springboot React.js and MySQL.1')}
        </h1>
        <p>{t('Feel free to create an account login and test out the system.1')}</p>
        <p>{t('Click here to retrieve details of the super manager account for testing.1')}</p>
      </div>
    </div>
  )
}

export default LandingPage
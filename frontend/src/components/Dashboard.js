import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className='d-flex flex-column' style={{ padding: '2rem', rowGap: '2rem' }}>
      <header className='text-center'>
        <h2>{t('Welcome to LGS.1')}, {user.first_name} {user.last_name}!</h2>
        <p>{t('Here you are able to view your account details and make changes to your account.1')}</p>
      </header>
      
      <div className='d-flex flex-row justify-content-around'>
        <img src={require('./assets/home.png')} />
        <div className='card'>
          <h3 className='text-center'>{t('User Information Card.1')}</h3>
          <table className='table-bordered table-hover'>
            <tr>
              <th>{t('Full Name.1')}</th>
              <td>{user.first_name} {user.last_name}</td>
            </tr>
            <tr>
              <th>{t('Username.1')}</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>{t('Role.1')}</th>
              <td>{user.manager === true ?
                (<span>Manager</span>) : (<span>User</span>)}
              </td>
            </tr>
          </table>
          <button className='edit btn'>Edit Account Details</button>
          <button className='view btn'>View Full Account Details</button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Admin.css';
import { useTranslation } from 'react-i18next';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { t, i18n } = useTranslation();

  const loadUsers = () => {
    axios.get('http://localhost:8085/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving all users: ", error);
      })
  };

  useEffect(() => {
    loadUsers();
    if (user.manager === false) {
      navigate('/home');
    }
  }, [])

  return (
    <div className='admin-body'>
      <header>
        <h3>{t('Admin Panel.1')}</h3>
        <p>{t('Welcome to the Admin Panel here admins are able to manage user accounts.1')}</p>
      </header>
      <table className='table-bordered table-hover'>
        <thead>
          <tr>
            <th>{t('ID.1')}</th>
            <th>{t('First Name.1')}</th>
            <th>{t('Last Name.1')}</th>
            <th>{t('Username.1')}</th>
            <th>{t('Email.1')}</th>
            <th>{t('Gender.1')}</th>
            <th>{t('Password.1')}</th>
            <th>{t('Role.1')}</th>
            <th>{t('Actions.1')}</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.first_name}</td>
                <td>{i.last_name}</td>
                <td>{i.username}</td>
                <td>{i.email}</td>
                <td>{i.gender}</td>
                <td>{i.password}</td>
                <td>{i.manager === true ? (<span>Manager</span>) : (<span>User</span>)}</td>
                <td><div className="dropdown">
                  <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fi fi-bs-menu-dots"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">
                      <i class="fi fi-sr-user-pen"></i>
                      <span>Edit Account</span>
                      
                    </a>
                    <a className="dropdown-item" href="#">
                      <i class="fi fi-sr-delete-user"></i>
                      <span>Delete Account</span>
                    </a>
                  </div>
                </div></td>
              </tr>
            ))
          }
        </tbody>


      </table>
    </div>
  )
}

export default Admin
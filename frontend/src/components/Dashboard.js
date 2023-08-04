import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Dashboard() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Update User Fn
  const [updatedUser, setUpdatedUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    created_on: '',
    manager: false
  })

  const selectUserForEdit = (user) => {
    setUpdatedUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      password: user.password,
      gender: user.gender,
      created_on: new Date(),
      manager: user.manager,
    });
  };

  const handleUserUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: name === 'manager' ? value === 'true' : value
    }));
  };

  const handleUserUpdateSubmit = (e) => {
    console.log(updatedUser);
    e.preventDefault();
    axios.put("http://localhost:8085/updateuser", updatedUser)
      .then((response) => {
        setUpdatedUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }


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
          <button className='edit btn'
            data-toggle="modal"
            data-target={`#editAccount`}
            onClick={() => selectUserForEdit(user)}>Edit Account Details</button>
          <button className='view btn'
            data-toggle="modal"
            data-target="#exampleModal">View Full Account Details</button>
          <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: '100%' }} role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title" id="exampleModalLabel">User Information</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body d-flex flex-row align-items-center">
                  <img src={require('./assets/view.png')} />
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
                      <th>{t('Email.1')}</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>{t('Gender.1')}</th>
                      <td>{user.gender}</td>
                    </tr>
                    <tr>
                      <th>{t('Role.1')}</th>
                      <td>{user.manager === true ?
                        (<span>Manager</span>) : (<span>User</span>)}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('Password.1')}</th>
                      <td>{user.password}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id={`editAccount`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{ maxWidth: '100%' }} >
              <div className="modal-content">
                <div className="modal-header">
                  <h3 claclassNamess="modal-title" id="exampleModalLabel">Editing User</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body d-flex flex-row justify-content-center align-items-center">
                  <img src={require('./assets/update.png')} />
                  <div className='edit-user'>
                    <form className='user-update-modal-form'>
                      <input type='number' className='form-control' name='id' onChange={handleUserUpdateChange} value={updatedUser.id} hidden />
                      <input type='text' className='form-control' name='first_name' onChange={handleUserUpdateChange} value={updatedUser.first_name} />
                      <input className='form-control' type='text' name='last_name' onChange={handleUserUpdateChange} value={updatedUser.last_name} />
                      <input className='form-control' type='text' name='username' onChange={handleUserUpdateChange} value={updatedUser.username} />
                      <input className='form-control' type='text' name='email' onChange={handleUserUpdateChange} value={updatedUser.email} />
                      <input className='form-control' type='password' value={updatedUser.password} name='password' onChange={handleUserUpdateChange} />
                      <select name='gender' onChange={handleUserUpdateChange} value={updatedUser.gender} className='form-control' >
                        <option selected value="">Select a Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Others">Others</option>
                      </select>
                      <select name='manager' onChange={handleUserUpdateChange} value={updatedUser.manager} className='form-control'>
                        <option selected value=''>Select a Role</option>
                        <option value='true'>Manager</option>
                        <option value='false'>User</option>
                      </select>
                      <input type='text' name='profile_picture' onChange={handleUserUpdateChange} value={updatedUser.profile_picture} hidden />
                      <button type='button' className='btn btn-outline-primary' data-dismiss="modal" onClick={handleUserUpdateSubmit}>Save Changes</button>
                      <button type='button' className='btn btn-outline-dark' data-dismiss="modal">Close</button>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
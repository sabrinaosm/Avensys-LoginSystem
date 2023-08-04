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

  // Delete User Fn
  const handleDeleteUserClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8085/deleteuser/${id}`)
        .then((response) => {
          loadUsers();
        })
        .catch((error) => {
          console.error("Error deleting user account: ", error);
        })
    }
  }

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
        loadUsers();
      })
      .catch((error) => {
        console.error(error);
      })
  }

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
                    <a
                      className="dropdown-item"
                      data-toggle="modal"
                      data-target={`#exampleModal${i.user_id}`}
                      onClick={() => selectUserForEdit(i)}
                    >
                      <i className="fi fi-sr-user-pen"></i>
                      <span>Edit Account</span>
                    </a>

                    <a className="dropdown-item"
                      key={user.id}
                      onClick={() => handleDeleteUserClick(user.id)}>
                      <i className="fi fi-sr-delete-user"></i>
                      <span>Delete Account</span>
                    </a>
                  </div>
                </div>
                </td>
              </tr>
            ))
          }
        </tbody>
        <div className="modal fade" id={`exampleModal${user.user_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{maxWidth: '100%'}} >
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

      </table>
    </div>
  )
}

export default Admin
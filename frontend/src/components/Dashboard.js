import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

function Dashboard() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column' style={{ padding: '1rem' }}>
      <p>Welcome, {user.first_name} {user.last_name}!</p>
      <image/>
      <div className='card'>
        <h3>User Information Card</h3>
        <table>
          <tr>
            <td>Full Name</td>
            <td>{user.first_name} {user.last_name}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{user.manager === true ?
              (<span>Manager</span>) : (<span>User</span>)}
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>{user.password}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
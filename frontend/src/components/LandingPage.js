import React from 'react'
import { Link } from 'react-router-dom'
import './css/LandingPage.css'

function LandingPage() {
  return (
    <div className='d-flex flex-column' style={{padding: '3rem'}}>
        <div className='landing-body'>
            <h1 className='welcome-h1'>
                Welcome, this is a login and registration system built using <span id='bolded'>Java Springboot</span>, <span id='bolded'>React.js</span> and <span id='bolded'>MySQL</span>!
            </h1>
            <p>Feel free to create an account, login and test out the system.</p>
            <p>Click here to retrieve details of the super manager account for testing!</p>
        </div>
    </div>
  )
}

export default LandingPage
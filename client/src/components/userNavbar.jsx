import React, { useState } from 'react';
import './userNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPaperPlane, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';

function UserNavbar() {
    return (
        <div className="usernavbar">
            <a href="/" >
                <img src="/logo.jpg" alt="" className='useradminlogo' />
            </a>
            <div className='usernavbar-header'>
                <a href="/" className='userbook' id='firstlink'>Book Charger</a>
                <a href="/userbookings" className='userbook'>Bookings</a>
                <a href="/userstatus" className='usercharger'>Status</a>
                <a href="/" className='userabout'>Rewards</a>
                <a href="/userfeedbacks" className='userabout'>Feedback</a>
                <a href="/login" className='useruser'><FontAwesomeIcon icon={faUser} /></a>
            </div>
        </div>
    );
}

export default UserNavbar;
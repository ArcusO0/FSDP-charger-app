import React, { useState } from 'react';
import './adminnavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPaperPlane, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (



        <div className="navbar">
            <a href="/" >
                <img src="/logo.jpg" alt="" className='adminlogo' />
            </a>
            <div className='navbar-header'>
                <a href="/AdminHome" className='book'><FontAwesomeIcon icon={faBook} /></a>
                <a href="/AdminRequests" className='charger'><FontAwesomeIcon icon={faPaperPlane} /></a>
                <a href="/" className='about'><FontAwesomeIcon icon={faQuestionCircle} /></a>

            </div>
            <a href="/login" className='user'><FontAwesomeIcon icon={faUser} /></a>
        </div>

    );
}

export default Navbar;
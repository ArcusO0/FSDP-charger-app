import React, { useState } from 'react';
import './navbarvendor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faBook, faBolt, faGear, faQuestionCircle, faUser, } from '@fortawesome/free-solid-svg-icons';

function Navbarvendor() {
    return (

        <div className="navbarvendor">
            <img src="assets\logo.jpg" alt="" className='logo' />
            <div className='navbar-header'>
                <a href="/" className='gridv'><FontAwesomeIcon icon={faTableCellsLarge} /></a>
                <a href="/" className='bookv'><FontAwesomeIcon icon={faBook} /></a>
                <a href="/requests" className='chargerv'><FontAwesomeIcon icon={faBolt} /></a>
                <a href="/" className='settingsv'><FontAwesomeIcon icon={faGear} /></a>
                <a href="/" className='aboutv'><FontAwesomeIcon icon={faQuestionCircle} /></a>

            </div>
            <a href="/" className='userv'><FontAwesomeIcon icon={faUser} /></a>
        </div>

    );
}

export default Navbarvendor;
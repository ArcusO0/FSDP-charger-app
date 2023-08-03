import React, { useState } from 'react';
import './navbaradmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faBolt,faGear,faQuestionCircle,faUser } from '@fortawesome/free-solid-svg-icons';

function Navbaradmin() {
  return (
   
    <div className="navbaradmin">
      <img src="assets\logo.jpg" alt="" className='logo' />
      <div className='navbar-header'>
        <a href="/" className='book'><FontAwesomeIcon icon={faBook} /></a>
        <a href="/requests" className='charger'><FontAwesomeIcon icon={faBolt}  /></a>
        <a href="/" className='settings'><FontAwesomeIcon icon={faGear}  /></a>
        <a href="/" className='about'><FontAwesomeIcon icon={faQuestionCircle} /></a>
        
      </div>
      <a href="/" className='user'><FontAwesomeIcon icon={faUser} /></a>
      </div>
      
  );
} 

export default Navbaradmin;


import React, { useState } from 'react';
import './navbaradmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faPaperPlane, faQuestionCircle,faUser } from '@fortawesome/free-solid-svg-icons';

function Navbaradmin() {
  return (
   
    <div className="navbaradmin">
      <img src="assets\logo.jpg" alt="" className='logo' />
      <div className='navbar-header'>
        <a href="/AdminHome" className='book'><FontAwesomeIcon icon={faBook} /></a>
        <a href="/AdminRequests" className='charger'><FontAwesomeIcon icon={faPaperPlane}  /></a>
        <a href="/" className='about'><FontAwesomeIcon icon={faQuestionCircle} /></a>
        
      </div>
      <a href="/" className='user'><FontAwesomeIcon icon={faUser} /></a>
      </div>
      
  );
} 

export default Navbaradmin;


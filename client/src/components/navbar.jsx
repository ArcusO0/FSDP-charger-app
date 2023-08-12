import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faPaperPlane, faQuestionCircle,faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
   
 
      
    <div className="navbar">
      <a href="/" >
        <img src="/logo.jpg" alt="" className='logo' />
      </a>
      <div className='navbar-header'>
        <a href="/adminhome" className='book'><FontAwesomeIcon icon={faBook} /></a>
        <a href="/requests" className='charger'><FontAwesomeIcon icon={faPaperPlane}  /></a>
        <a href="/" className='about'><FontAwesomeIcon icon={faQuestionCircle} /></a>
        
      </div>
      <a href="/" className='user'><FontAwesomeIcon icon={faUser} /></a>
      </div>
      
  );
}

export default Navbar;


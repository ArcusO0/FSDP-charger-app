import React, { useState } from 'react';
import './navbaradmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD:client/src/pages/navbar/navbaradmin.jsx
import { faBook,faBolt,faGear,faQuestionCircle,faUser } from '@fortawesome/free-solid-svg-icons';
=======
import { faBook,faPaperPlane, faQuestionCircle,faUser } from '@fortawesome/free-solid-svg-icons';
>>>>>>> origin/Marcus:client/src/components/navbar.jsx

function Navbaradmin() {
  return (
   
    <div className="navbaradmin">
      <img src="assets\logo.jpg" alt="" className='logo' />
      <div className='navbar-header'>
<<<<<<< HEAD:client/src/pages/navbar/navbaradmin.jsx
        <a href="/" className='book'><FontAwesomeIcon icon={faBook} /></a>
        <a href="/requests" className='charger'><FontAwesomeIcon icon={faBolt}  /></a>
        <a href="/" className='settings'><FontAwesomeIcon icon={faGear}  /></a>
=======
        <a href="/AdminHome" className='book'><FontAwesomeIcon icon={faBook} /></a>
        <a href="/AdminRequests" className='charger'><FontAwesomeIcon icon={faPaperPlane}  /></a>
>>>>>>> origin/Marcus:client/src/components/navbar.jsx
        <a href="/" className='about'><FontAwesomeIcon icon={faQuestionCircle} /></a>
        
      </div>
      <a href="/" className='user'><FontAwesomeIcon icon={faUser} /></a>
      </div>
      
  );
} 

export default Navbaradmin;


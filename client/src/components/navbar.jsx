import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faBook,faBolt,faGear,faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
   
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="navbar-header">
        <a href="#"><FontAwesomeIcon icon={faBook} className='book'/></a>
        <a href="/tutorials"><FontAwesomeIcon icon={faBolt} className='charger' /></a>
        <a href="/addtutorials"><FontAwesomeIcon icon={faGear} className='settings' /></a>
        <a href="#"><FontAwesomeIcon icon={faQuestionCircle} className='about' /></a>
      </div>
      
    </div>
  );
}

export default Navbar;


import React, { useEffect, useState } from 'react';
import "./admin.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation,faBookOpen } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/navbar';

function Tutorials() {
    
    return (
        <>
            
            <Navbar />
            <button className='top'><FontAwesomeIcon icon={faChargingStation} className='icon' /></button>
            <button className='bottom'><FontAwesomeIcon icon={faBookOpen} className='icon' /></button>
        </>
    );
}

export default Tutorials;
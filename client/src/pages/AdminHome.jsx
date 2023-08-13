<<<<<<< HEAD
import React from 'react';
import "./admin.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation,faBookOpen } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/navbar';

function AdminHome() {
    
    return (
        <>
            
            <Navbar />
            <h1 className='header'>Records</h1>
            <h2 className='subheader1'>EV Chargers</h2>
            <a href='/AdminCharger'><button className='top'><FontAwesomeIcon icon={faChargingStation} className='icon' /></button></a>
            <h2 className='subheader2'>Bookings</h2>
            <a href='/AdminBookings'><button className='bottom'><FontAwesomeIcon icon={faBookOpen} className='icon' /></button></a>
        </>
    );
}

=======
import React from 'react';
import "./admin.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation,faBookOpen } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/navbar';

function AdminHome() {
    
    return (
        <>
            
            <Navbar />
            <h1 className='header'>Records</h1>
            <h2 className='subheader1'>EV Chargers</h2>
            <a href='/AdminCharger'><button className='top'><FontAwesomeIcon icon={faChargingStation} className='icon' /></button></a>
            <h2 className='subheader2'>Bookings</h2>
            <a href='/AdminBookings'><button className='bottom'><FontAwesomeIcon icon={faBookOpen} className='icon' /></button></a>
        </>
    );
}

>>>>>>> 5796c38caeb251f06ad8316df45f41c50553e52a
export default AdminHome;
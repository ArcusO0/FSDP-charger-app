import React from 'react';
import "./requests.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Request from '../components/request';

import Navbar from '../components/navbar';

function AdminRequests() {

    return (
        <div className='pageContainer'>

            <Navbar />
            <div className='verticalLine'></div>
            <h1 className='requestsTitle'>Pending Requests</h1>
            
            
            <h2>"Add Requests"</h2>
            <h2 className='deltitle'>"Delete Requests"</h2>
            <div className='addRequestsContainer'>
                
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
            </div>
            
            <div className='deleteRequestsContainer'>
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />    
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />  
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />
                <Request id="1" name="Acacia Grove" />  
                

            </div>
            
            
            
        </div>
    );
}

export default AdminRequests;
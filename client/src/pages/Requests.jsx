import React, { useState, useEffect } from 'react';
import "./requests.css"
import Request from '../components/request';
import http from '../http';
import Navbar from '../components/navbar';

function AdminRequests() {
    const [requests, setrequests] = useState([]);
    const getRequests = () => {
        http.get('/requests').then((res) => {
            setrequests(res.data);
        });
    };
    useEffect(() => {
        getRequests();
    }, []);

    const addRequests = requests.filter((request) => request.addOrDelete);
    const deleteRequests = requests.filter((request) => !request.addOrDelete);
    return (
        <div className='pageContainer'>

            <Navbar />
            <div className='verticalLine'></div>
            <h1 className='requestsTitle'>Pending Requests</h1>
            
            
            <h2>"Add Requests"</h2>
            <h2 className='deltitle'>"Delete Requests"</h2>
            <div className='addRequestsContainer'>
                
                {addRequests.map((request) => (
                    <Request key={request.id} id={request.id} name={request.name} />
                ))}
            </div>
            
            <div className='deleteRequestsContainer'>
                {deleteRequests.map((request) => (
                    <Request key={request.id} id={request.id} name={request.name} />
                ))}

            </div>
            
            
            
        </div>
    );
}

export default AdminRequests;
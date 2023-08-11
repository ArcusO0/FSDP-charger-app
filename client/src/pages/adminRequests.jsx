import React, { useState, useEffect } from 'react';
import "./adminrequests.css"
import Request from '../components/request';
import http from '../http';
import RequestInfoDialog from '../components/infodialog';
import Navbar from '../components/navbar';

function AdminRequests() {
    const [requests, setrequests] = useState([]);
    const [infoshow, setInfoshow] = useState(false);
    const [infoData, setInfoData] = useState({
        reqId: '',
        name: '',
        address: '',
        description: ''
    });

    const toggleInfoshow = (data) => {
        setInfoData(data); // Set the info data for the dialog
        setInfoshow(!infoshow);
    };

    const closeInfoDialog = () => {
        setInfoshow(false);
    };
    const getRequests = () => {
        http.get('/MyRequests').then((res) => {

            setrequests(res.data);
        });
    };
    useEffect(() => {
        getRequests();
    }, []);
    const onlypending = requests.filter((request) => request.status == "Pending");
    const addRequests = onlypending.filter((request) => request.addOrDelete);
    const deleteRequests = onlypending.filter((request) => !request.addOrDelete);
    return (
        <div className='pageContainer'>

            <Navbar />
            <div className='verticalLine'></div>
            <h1 className='requestsTitle'>Pending Requests</h1>
            
            
            <h2>"Add Requests"</h2>
            <h2 className='deltitle'>"Delete Requests"</h2>
            <div className='addRequestsContainer'>
                
                {addRequests.map((request) => (
                    <Request key={request.id} id={request.id} name={request.name} status={request.status} reqId={request.reqId} toggleInfoshow={toggleInfoshow} address={request.address} description={request.description} addOrDelete={request.addOrDelete} />
                ))}
            </div>
            
            <div className='deleteRequestsContainer'>
                {deleteRequests.map((request) => (
                    <Request key={request.id} id={request.id} name={request.name} status={request.status} reqId={request.reqId} toggleInfoshow={toggleInfoshow} address={request.address} description={request.description} addOrDelete={request.addOrDelete} />
                ))}

            </div>
            <RequestInfoDialog
                open={infoshow}
                handleClose={closeInfoDialog}
                userid={infoData.id}
                reqId={infoData.reqId}
                name={infoData.name}
                address={infoData.address}
                description={infoData.description}
                addOrDelete={infoData.addOrDelete}
            />
            
            
            
            
        </div>
    );
}

export default AdminRequests;
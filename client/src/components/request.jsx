import React from 'react';
import "./request.css";
import http from '../http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo ,faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Request = ({ id, name, status, reqId, toggleInfoshow, address, description, addOrDelete, bookingRate }) => {
    
    const requestdata = {
        vendorId:reqId,
        chargerId: reqId,
        name: name,
        description: description,
        address: address,
        bookingRate: bookingRate,
        rating: "0.0",
        status: "Good",
        noOfBookings: 0
    };
    const acceptrequest = () => {
        http.put(`/MyRequests/updateRequest/accept/${id}`).then((res) => {
            if (!addOrDelete) {
                http.delete(`/MyEVC/${id}`)
            }
            else {
                http.post(`/MyEVC/AddEVC`, requestdata)
                console.log("added")
            }
            location.reload(requestdata);

        });
    };
    const rejectrequest = () => {
        http.put(`/MyRequests/updateRequest/reject/${id}`).then((res) => {
            location.reload();

        });
    };
    const handleInfoClick = () => {
        toggleInfoshow({
            reqId: reqId,
            name: name,
            address: address,
            description: description,
            bookingRate: bookingRate,
            id: id,
            addOrDelete: addOrDelete
        }); // Call the callback function to toggle infoshow
    };
    return (
        <div className='reqContainer'>
            <h4>Request Id: {reqId}</h4>
            <br></br>
            <h4>EV Charger Name: </h4>
            <p>{name}</p>
            <br></br>
            <h4>Status: {status}</h4>
            <br></br>
            
            <FontAwesomeIcon icon={faCircleInfo} style={{ position: "absolute", bottom: "2px", right: "15%", cursor: "pointer" }} onClick={handleInfoClick} />
            <FontAwesomeIcon icon={faCheck} style={{ position: "absolute", bottom: "2px", right: "8%", color: "#4dff00", cursor:"pointer"}} onClick={acceptrequest} />
            <FontAwesomeIcon icon={faXmark} style={{ position: "absolute", bottom: "2px", right: "1%", color: "#ff0000", cursor: "pointer" }} onClick={rejectrequest}/>
        </div>
    );
}

export default Request;
import React from 'react';
import Modal from '@mui/material/Modal';
import "./infodialog.css";
import http from '../http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const RequestInfoDialog = ({ open, handleClose, userid, reqId, name, address, description, addOrDelete,bookingRate }) => {
    const acceptrequest = () => {
        http.put(`/MyRequests/updateRequest/accept/${userid}`).then((res) => {
            location.reload();

        });
    };
    const rejectrequest = () => {
        http.put(`/MyRequests/updateRequest/reject/${userid}`).then((res) => {
            location.reload();

        });
    };
    var header = "";
    if (addOrDelete)
    {
        header = "Add Request";
    }
    else {
        header = "Delete Request"
    }
    return (
        <Modal open={open} onClose={handleClose} >
            <div className='overlay'>
                <h2>{header }</h2>
                <p>Request ID: {reqId}</p>
                <p>Name: {name}</p>
                <p>Address: {address}</p>
                <p >Description: {description} </p>
                <FontAwesomeIcon icon={faChevronLeft} onClick={handleClose} className='exit' />
                <br></br>
                <button onClick={acceptrequest} className="accept">Accept</button>
                <br></br>
                <button onClick={rejectrequest} className='deny'>Deny</button>
                
            </div>
            
        </Modal>
    );
}

export default RequestInfoDialog;
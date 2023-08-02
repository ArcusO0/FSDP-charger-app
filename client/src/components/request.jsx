import React from 'react';
import "./request.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo ,faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Request = ({ id, name,status }) => {
    return (
        <div className='reqContainer'>
            <h4>Request Id: {id}</h4>
            <br></br>
            <h4>EV Charger Name: </h4>
            {name}
            <br></br>
            
            <FontAwesomeIcon icon={faCircleInfo} style={{ position: "absolute", bottom: "2px", right: "15%",  }} />
            <FontAwesomeIcon icon={faCheck} style={{ position: "absolute", bottom: "2px", right: "8%", color: "#4dff00" }} />
            <FontAwesomeIcon icon={faXmark} style={{ position: "absolute", bottom: "2px", right: "1%", color: "#ff0000"}} />
        </div>
    );
}

export default Request;
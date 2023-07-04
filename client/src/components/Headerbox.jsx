import React from 'react';
import "./headerbox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Headerbox = ({ number, text }) => {
    return (
        <>
        <a href='/'> <FontAwesomeIcon icon={faChevronLeft} className='back' /></a>
        <div className='container'>
            {/* Use the number and text props */}
            <h1 className='number'>{number}</h1>
            <h4 className='words'>{text}</h4>
            </div>
        </>
    );
}

export default Headerbox;


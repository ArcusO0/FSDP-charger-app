import React, { useState, useEffect } from 'react';
import "./bookings.css"
import Headerbox from '../components/Headerbox';

import http from '../http';
import Navbar from '../components/navbar';

function AdminBookings() {
    const [bookingdata, setbookingdata] = useState([]);
    const getBookings = () => {
        http.get('/bookings').then((res) => {
            setbookingdata(res.data);
        });
    };
    useEffect(() => {
        getBookings();
    }, []);
    return (
        <>
            <Navbar />
            <Headerbox number={bookingdata.length} text="Bookings" />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer ID</th>
                            <th>EV Charger ID</th>
                            <th>Booking Date</th>
                            <th>Booking Price ($)</th>
                            
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        
                        {bookingdata.map((booking) => (
                            <tr key={booking.bookingID}>
                                <td>{booking.bookingID}</td>
                                <td>{booking.customerID}</td>
                                <td>{booking.chargerID}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.bookingPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminBookings;
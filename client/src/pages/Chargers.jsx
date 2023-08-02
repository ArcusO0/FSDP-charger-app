import React, {useState, useEffect} from 'react';
import "./charger.css"
import Headerbox from '../components/Headerbox';

import http from '../http';
import Navbar from '../components/navbar';

function AdminCharger() {
    const [chargerdata, setchargerdata] = useState([]);
    const getChargers = () => {
        http.get('/chargers').then((res) => {
            setchargerdata(res.data);
        });
    };
    useEffect(() => {
        getChargers();
    }, []);
    return (
        <>
            <Navbar />
            <Headerbox number={chargerdata.length} text="Chargers"/> 
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Charger ID</th>
                            <th>Rating</th>
                            <th>Address</th>
                            <th>Name</th>
                            <th>No. of bookings</th>
                            <th>Booking rates</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">

                        {chargerdata.map((charger) => (
                            <tr key={charger.id}>
                                <td>{charger.id}</td>
                                <td>{charger.rating}</td>
                                <td>{charger.address}</td>
                                <td>{charger.name}</td>
                                <td>{charger.noOfBookings}</td>
                                <td>{charger.bookingRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminCharger;
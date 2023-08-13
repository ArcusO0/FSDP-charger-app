import React, { useState, useEffect } from 'react';
import "./adminbookings.css"
import Headerbox from '../components/Headerbox';

import http from '../http';
import Navbar from '../components/adminnavbar';

function AdminBookings() {
    const [bookingdata, setbookingdata] = useState([]);
    const [sortColumn, setSortColumn] = useState("bookingID");
    const [sortOrder, setSortOrder] = useState("asc");

    const getBookings = () => {
        http.get('/MyBookings').then((res) => {
            setbookingdata(res.data);
            console.log(res.data)
        });
    };

    useEffect(() => {
        getBookings();
    }, []);

    const sortedBookings = [...bookingdata].sort((a, b) => {
        const compareA = a[sortColumn];
        const compareB = b[sortColumn];

        if (sortOrder === "asc") {
            if (compareA < compareB) return -1;
            if (compareA > compareB) return 1;
            return 0;
        } else {
            if (compareA > compareB) return -1;
            if (compareA < compareB) return 1;
            return 0;
        }
    });

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };
    return (
        <>
            <Navbar />
            <Headerbox number={sortedBookings.length} text="Bookings" />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("bookingID")}>
                                Booking ID{" "}
                                {sortColumn === "bookingID" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("customerID")}>
                                Customer ID{" "}
                                {sortColumn === "customerID" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("chargerID")}>
                                EV Charger ID{" "}
                                {sortColumn === "chargerID" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("bookingDate")}>
                                Booking Date{" "}
                                {sortColumn === "bookingDate" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("bookingPrice")}>
                                Booking Price ($){" "}
                                {sortColumn === "bookingPrice" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {sortedBookings.map((booking) => (
                            <tr key={booking.bookingId}>
                                <td>{booking.bookingId}</td>
                                <td>{booking.customerId}</td>
                                <td>{booking.evcId}</td>
                                <td>{booking.createdAt.split("T")[0]}</td>
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
import React, { useState, useEffect } from 'react';
import "./admincharger.css"
import Headerbox from '../components/Headerbox';

import http from '../http';
import Navbar from '../components/navbar';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
<script src="path/to/chartjs/dist/chart.umd.js"></script>

function AdminCharger() {
    const [chargerdata, setchargerdata] = useState([]);
    const [sortColumn, setSortColumn] = useState("chargerId");
    const [sortOrder, setSortOrder] = useState("asc");

    const getChargers = () => {
        http.get('/MyEVC').then((res) => {
            setchargerdata(res.data);
        });
    };

    useEffect(() => {
        getChargers();
    }, []);

    const sortedChargers = [...chargerdata].sort((a, b) => {
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
            <Headerbox number={sortedChargers.length} text="Chargers" />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("chargerId")}>
                                Charger ID{" "}
                                {sortColumn === "chargerId" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("rating")}>
                                Rating{" "}
                                {sortColumn === "rating" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("address")}>
                                Address{" "}
                                {sortColumn === "address" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("name")}>
                                Name{" "}
                                {sortColumn === "name" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("noOfBookings")}>
                                No. of bookings{" "}
                                {sortColumn === "noOfBookings" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort("bookingRate")}>
                                Booking rates{" "}
                                {sortColumn === "bookingRate" && (
                                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                )}
                            </th>
                            <th>trend</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {sortedChargers.map((charger) => (

                            <tr key={charger.chargerId}>
                                <td>{charger.chargerId}</td>
                                <td>{charger.rating}</td>
                                <td>{charger.address}</td>
                                <td>{charger.name}</td>
                                <td>{charger.noOfBookings}</td>
                                <td>{charger.bookingRate}</td>
                                <td>
                                    <Line
                                        data={{
                                            labels: charger.FinalBookings.map((_, index) => index + 1),
                                            datasets: [
                                                {
                                                    label: 'Booking Price',
                                                    data: charger.FinalBookings.map(item => item.bookingPrice),
                                                    borderColor: 'blue',
                                                    borderWidth: 1,
                                                    fill: false
                                                }
                                            ]
                                        }}
                                        options={{
                                            responsive: false, // Adjust as needed
                                        }}
                                    />
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminCharger;

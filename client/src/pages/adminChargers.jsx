import React, { useState, useEffect } from 'react';
import "./admincharger.css"
import Headerbox from '../components/Headerbox';
import { Box,  Input, IconButton } from '@mui/material';
import {  Search, Clear } from '@mui/icons-material';
import http from '../http';
import Navbar from '../components/adminnavbar';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
<script src="path/to/chartjs/dist/chart.umd.js"></script>

function AdminCharger() {
    const [chargerdata, setchargerdata] = useState([]);
    const [sortColumn, setSortColumn] = useState("chargerId");
    const [sortOrder, setSortOrder] = useState("asc");

    

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
    var totalpercharger = []
    for (let i = 0; i < sortedChargers.length; i++){
        
        const aggregatedPrices = {};
        const convertedDictionary = { 'date': [], 'price': [] };

        sortedChargers[i]['FinalBookings'].forEach(entry => {
            const { createdAt, bookingPrice } = entry;

            // Extract the date part of the datetime
            const dateOnly = createdAt.slice(0, 10);

            // If the date already exists in the aggregatedPrices object, add the price
            if (aggregatedPrices[dateOnly]) {
                aggregatedPrices[dateOnly] += parseFloat(bookingPrice);
            } else {
                // If the date doesn't exist, create a new entry with the price
                aggregatedPrices[dateOnly] = parseFloat(bookingPrice);
            }
        });
        for (const [date, price] of Object.entries(aggregatedPrices)) {
            convertedDictionary['date'].push(date);
            convertedDictionary['price'].push(price);
        }
        totalpercharger.push(convertedDictionary)
    }


    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const [search, setSearch] = useState('');
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const getChargers = () => {
        http.get('/MyEVC').then((res) => {
            setchargerdata(res.data);
        });
    };

    useEffect(() => {
        getChargers();
    }, []);
    const searchChargers = () => {
        http.get(`/MyEVC?search=${search}`).then((res) => {
            setchargerdata(res.data);
            console.log(res.data)
        });
    };
    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchChargers();
        }
    };
    const onClickSearch= () => {
        searchChargers();
    }
    const onClickClear= () => {
        setSearch('');
        getChargers();
    };

    return (
        <>
            <Navbar />
            <Headerbox number={sortedChargers.length} text="Chargers" />
            <Box sx={{ display: 'block', alignItems: 'center', mb: 2 ,position:'absolute',right:0,top:"40%"}}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown}/>
                <IconButton color="primary" onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>
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
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {sortedChargers.map((charger,index) => (

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
                                            labels: totalpercharger[index].date.reverse(),
                                            color: "#fba263",
                                                    datasets: [
                                                        {
                                                            label: '',
                                                            data: totalpercharger[index].price.reverse(),
                                                            backgroundColor: "#fba263",
                                                            borderColor: '#fba263',
                                                            color: "#fba263",
                                                            borderWidth: 1,
                                                            fill: false,
                                                        },
                                            ],
                                                }}
                                                options={{
                                                    responsive: false,
                                                    plugins: {
                                                        legend: {
                                                            display: false,
                                                        },
                                                    },
                                                    scales: {
                                                        x: {
                                                            ticks: {
                                                                color: "#fba263",
                                                            },
                                                            title: {
                                                                display: true,
                                                                text: 'Date',
                                                                color: "#fba263",
                                                            },
                                                        },
                                                        y: {
                                                            ticks: {
                                                                color: "#fba263",
                                                            },
                                                            title: {
                                                                display: true,
                                                                text: 'Total Earnings',
                                                                color: "#fba263",
                                                            },
                                                        },
                                                    },
                                                }
                                            }
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

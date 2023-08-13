import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

<<<<<<< HEAD

function UserBookings() {
    const [bookingList, setBookingList] = useState([]);
    const [oldbookingList, setOldBookingList] = useState([]);
    const [search, setSearch] = useState('');
    
=======
function UserBookings() {
    const [bookingList, setBookingList] = useState([]);
    const [search, setSearch] = useState('');

>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
    const MoveToOld = () => {
        bookingList.map((booking, a) =>{
            var expiry = 0
            expiry = parseInt((booking.arrivaltime).substring(0,2)) + booking.duration;
            if(dayjs().format("HH") >= expiry){
                http.post("/olduserbooking", booking)
                .then((res) => {
                    console.log(res.booking);
                });
                    http.delete(`/userbooking/${booking.id}`)
                .then((res) => {
                    console.log(res.data);
                });
                getOldBookings()
            }
        })
    };

    const onClickRefresh = () => {
        MoveToOld();
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

<<<<<<< HEAD
    const getOldBookings = () => {
        http.get('/olduserbooking').then((res) => {
            setOldBookingList(res.data);
        });
    };

    const searchOldBookings = () => {
        http.get(`/olduserbooking?search=${search}`).then((res) => {
            setOldBookingList(res.data);
        });
    };

=======
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
    const getBookings = () => {
        http.get('/userbooking').then((res) => {
            setBookingList(res.data);
        });
    };

    const searchBookings = () => {
        http.get(`/userbooking?search=${search}`).then((res) => {
            setBookingList(res.data);
        });
    };

    useEffect(() => {
        getBookings();
<<<<<<< HEAD
        getOldBookings();
=======
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchBookings();
        }
    };

    const onClickSearch = () => {
        searchBookings();
    }

    const onClickClear = () => {
        setSearch('');
        getBookings();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Active Bookings
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                
                <Box sx={{ flexGrow: 1}} />
                <Button variant='contained'
                    onClick={onClickRefresh}>
                    Refresh
                </Button>
                <Box sx={{ pr: 5}} />
                <Link to="/adduserbooking" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Book A Charger
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    bookingList.map((booking, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={booking.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
<<<<<<< HEAD
                                                {booking.bookingID}
                                            </Typography>
                                            <Link to={`/edituserbooking/${booking.id}`}>
=======
                                                {booking.email}
                                            </Typography>
                                            <Link to={`/editbooking/${booking.id}`}>
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
                                                <IconButton color="primary" sx={{ padding: '4px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(booking.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {"Arrival: " + booking.arrivaltime}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {"Hours: " + booking.duration}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
            <Typography variant="h5" sx={{ my: 2 }}>
                Old Bookings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
            </Box>

            <Grid container spacing={2}>
                {
                    oldbookingList.map((olduserbooking, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={olduserbooking.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {olduserbooking.bookingID}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(olduserbooking.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {"Arrival: " + olduserbooking.arrivaltime}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
<<<<<<< HEAD
                                            {"Hours: " + olduserbooking.duration}
=======
                                            {oldbooking.hours}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {oldbooking.arrival}
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
        
        
    );
}

export default UserBookings;
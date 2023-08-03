import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import "./userNavbar.css"
function UserNavbar() {
    return (
        <AppBar position="static" className="AppBar" id="navbar">
            <Container>
                <Toolbar disableGutters={true}>
                    <Link to="/">
                        <img src="/logo.jpg" alt="" />
                    </Link>
                    <Link to="/bookings" ><Typography>Bookings</Typography></Link>
                    <Link to="/rewards" ><Typography>Rewards</Typography></Link>
                    <Link to="/status" ><Typography>Status</Typography></Link>
                    <Link to="/map" ><Typography>Map</Typography></Link>
                    <Link to="/feedbacks" ><Typography>Feedbacks</Typography></Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default UserNavbar;
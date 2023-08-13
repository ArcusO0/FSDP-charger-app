import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

function Customer() {
  return (
    <Router>
      <AppBar position="static" className="AppBar" id="navbar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <img src="/car.png" alt="" />
            </Link>
            <Link to="/userbookings" ><Typography>Bookings</Typography></Link>
            <Link to="/userrewards" ><Typography>Rewards</Typography></Link>
            <Link to="/userstatus" ><Typography>Status</Typography></Link>
            <Link to="/usermap" ><Typography>Map</Typography></Link>
            <Link to="/userfeedbacks" ><Typography>Feedbacks</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Router>
  );
}

export default Customer;

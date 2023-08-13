import './App.css';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminCharger from './pages/Chargers';
import AdminBookings from './pages/UserBookings';
import AdminRequests from './pages/Requests';
import HomePage from './pages/home';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import http from './http';
import LoginVendor from './pages/LoginVendor';
import RegisterVendor from './pages/RegisterVendor';
import UpdateProfile from './pages/UpdateProfile';
import LoginAdmin from './pages/LoginAdmin'
import Navbaradmin from './pages/navbar/navbaradmin';
import Feedbacks from './pages/Feedbacks';
import AddFeedback from './pages/AddFeedback';
import EditFeedback from './pages/EditFeedback';
import Status from './pages/Status';
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';
import UserBookings from './pages/UserBookings';


          





function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <Router>
      <AppBar position="static" className="AppBar" sx={{ backgroundColor: 'green' }}>
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              
            </Link>
            <Link to="/bookings" ><Typography>Bookings</Typography></Link>
            <Link to="/rewards" ><Typography>Rewards</Typography></Link>
            <Link to="/status" ><Typography>Status</Typography></Link>
            <Link to="/map" ><Typography>Map</Typography></Link>
            <Link to="/feedbacks" ><Typography>Feedbacks</Typography></Link>
            {user && (
              <>
                <Link to="/UpdateProfile">
                  <Typography>{user.name}</Typography>
                </Link>
                <Button onClick={logout}>Logout</Button>
              </>
            )
            }
            {!user && (
              <>
                <Link to="/register" ><Typography>Register</Typography></Link>
                <Link to="/login" ><Typography>Login</Typography></Link>
              </>
            )}




          </Toolbar>
        </Container>
      </AppBar>

      <Container>
              <Routes>
            <Route path={"/"} element={<HomePage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/loginvendor"} element={<LoginVendor />} />
          <Route path={"/registervendor"} element={<RegisterVendor />} />
          <Route path={"/updateprofile"} element={<UpdateProfile />} />
          <Route path={"/loginadmin"} element={<LoginAdmin />} />
          <Route path={"/navbaradmin"} element={<Navbaradmin />} />
          
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/AdminCharger"} element={<AdminCharger />} />
                <Route path={"/AdminBookings"} element={<AdminBookings />} />
                <Route path={"/Requests"} element={<AdminRequests />} />
        
          <Route path={"/feedbacks"} element={<Feedbacks />} />
          <Route path={"/addfeedback"} element={<AddFeedback />} />
          <Route path={"/editfeedback/:id"} element={<EditFeedback />} />
          <Route path={"/status"} element={<Status />} />
          <Route path={"/addbooking"} element={<AddBooking />} />
          <Route path={"/editbooking/:id"} element={<EditBooking />} />
          <Route path={"/bookings"} element={<UserBookings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminCharger from './pages/adminChargers';
import AdminBookings from './pages/adminbookings';
import AdminRequests from './pages/adminRequests';
import HomePage from './pages/home';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
import Register from './pages/Register';
import Login from './pages/Login';
import http from './http';
import LoginVendor from './pages/LoginVendor';
import RegisterVendor from './pages/RegisterVendor';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import LoginAdmin from './pages/LoginAdmin';
import Navbaradmin from './pages/navbar/navbaradmin';
import Navbarvendor from './pages/navbar/navbarvendor';
import VendorAddEVCRequest from "./pages/VendorAddEVCRequest";
import VendorBookings from './pages/VendorBookings';
import VendorDashboard from './pages/VendorDashboard';
import VendorEVCMap from './pages/VendorEVCMap';
import VendorEVCMenu from './pages/VendorEVCMenu';
import VendorRequests from './pages/VendorRequests';
import VendorUpdateEVC from './pages/VendorUpdateEVC';


<<<<<<< HEAD
          




=======
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421

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
<<<<<<< HEAD
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
=======
      

      <Container>
        <Routes>

          <Route path={"/"} element={<HomePage />} />
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/loginvendor"} element={<LoginVendor />} />
          <Route path={"/registervendor"} element={<RegisterVendor />} />
          <Route path={"/updateprofile"} element={<UpdateProfile />} />
          <Route path={"/updatepassword"} element={<UpdatePassword />} />
          <Route path={"/loginadmin"} element={<LoginAdmin />} />
<<<<<<< HEAD
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
=======
          <Route path={"/navbaradmin"} element={<Navbaradmin/>} />
          <Route path={"/navbarvendor"} element={<Navbarvendor />} />
          <Route path={'/Dashboard'} element={<VendorDashboard />} />
          <Route path={'/MyBookings'} element={<VendorBookings />} />
          <Route path={'/MyRequests'} element={<VendorRequests />} />
          <Route path={'/MyEVC'} element={<VendorEVCMap />} />
          <Route path={"/MyEVC/Menu"} element={<VendorEVCMenu />} />
          <Route path={"MyEVC/Menu/AddEVC"} element={<VendorAddEVCRequest />} />
          <Route path={"/MyEVC/Menu/UpdateEVC"} element={<VendorUpdateEVC />} />

          <Route path={"/AdminHome"} element={<AdminHome/>} />
          <Route path={"/AdminCharger"} element={<AdminCharger />} />
          <Route path={"/AdminBookings"} element={<AdminBookings />} />
          <Route path={"/AdminRequests"} element={<AdminRequests />} />
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

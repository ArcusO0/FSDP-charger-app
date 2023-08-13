import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminCharger from './pages/adminChargers';
import AdminBookings from './pages/adminbookings';
import AdminRequests from './pages/adminRequests';
import HomePage from './pages/home';
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
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
      

      <Container>
        <Routes>

          <Route path={"/"} element={<HomePage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/loginvendor"} element={<LoginVendor />} />
          <Route path={"/registervendor"} element={<RegisterVendor />} />
          <Route path={"/updateprofile"} element={<UpdateProfile />} />
          <Route path={"/updatepassword"} element={<UpdatePassword />} />
          <Route path={"/loginadmin"} element={<LoginAdmin />} />
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

          <Route path={"/userfeedbacks"} element={<UserFeedbacks />} />
          <Route path={"/adduserfeedback"} element={<AddUserFeedback />} />
          <Route path={"/edituserfeedback/:id"} element={<EditUserFeedback />} />
          <Route path={"/userstatus"} element={<UserStatus/>} />
          <Route path={"/adduserbooking"} element={<AddUserBooking />} />
          <Route path={"/edituserbooking/:id"} element={<EditUserBooking />} />
          <Route path={"/userbookings"} element={<UserBookings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

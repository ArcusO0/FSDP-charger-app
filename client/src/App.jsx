import './App.css';
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import http from './http';
import LoginVendor from './pages/LoginVendor';
import RegisterVendor from './pages/RegisterVendor';
import UpdateProfile from './pages/UpdateProfile';
import LoginAdmin from './pages/LoginAdmin'
import Navbaradmin from './pages/navbar/navbaradmin';
import Navbarvendor from './pages/navbar/navbarvendor';
import UpdatePassword from './pages/UpdatePassword';




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
              <Typography variant="h6" component="div">
                Logo
              </Typography>
            </Link>
            <Link to="/" ><Typography>Bookings</Typography></Link>
            <Box sx={{ flexGrow: 0.5 }}></Box>
            <Link to="/" ><Typography>Rewards</Typography></Link>
            <Box sx={{ flexGrow: 0.5 }}></Box>
            <Link to="/" ><Typography>Status</Typography></Link>
            <Box sx={{ flexGrow: 0.5 }}></Box>
            <Link to="/" ><Typography>Map</Typography></Link>
            <Box sx={{ flexGrow: 0.5 }}></Box>
            <Link to="/" ><Typography>Feedback</Typography></Link>
            <Box sx={{ flexGrow: 2 }}></Box>
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
          <Route path={"/"} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/loginvendor"} element={<LoginVendor />} />
          <Route path={"/registervendor"} element={<RegisterVendor />} />
          <Route path={"/updateprofile"} element={<UpdateProfile />} />
          <Route path={"/updatepassword"} element={<UpdatePassword />} />
          <Route path={"/loginadmin"} element={<LoginAdmin />} />
          <Route path={"/navbaradmin"} element={<Navbaradmin/>} />
          <Route path={"/navbarvendor"} element={<Navbarvendor/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

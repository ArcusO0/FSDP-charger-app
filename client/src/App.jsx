import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminCharger from './pages/Chargers';
import AdminBookings from './pages/bookings';
import AdminRequests from './pages/Requests';
import HomePage from './pages/home';


function App() {
  return (
    <Router>
      
     
      

      <Container>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/adminhome"} element={<AdminHome/>} />
          <Route path={"/AdminCharger"} element={<AdminCharger />} />
          <Route path={"/AdminBookings"} element={<AdminBookings />} />
          <Route path={"/Requests"} element={<AdminRequests />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

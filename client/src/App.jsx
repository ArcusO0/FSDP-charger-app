import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminCharger from './pages/adminChargers';
import AdminBookings from './pages/adminbookings';
import AdminRequests from './pages/adminRequests';
import HomePage from './pages/home';


function App() {
  return (
    <Router>
      
     
      

      <Container>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/AdminHome"} element={<AdminHome/>} />
          <Route path={"/AdminCharger"} element={<AdminCharger />} />
          <Route path={"/AdminBookings"} element={<AdminBookings />} />
          <Route path={"/AdminRequests"} element={<AdminRequests />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

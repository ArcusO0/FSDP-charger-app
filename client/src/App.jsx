import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Tyler Imports
import VendorAddEVCRequest from "./pages/VendorAddEVCRequest";
import VendorBookings from './pages/VendorBookings';
import VendorDashboard from './pages/VendorDashboard';
import VendorEVCMap from './pages/VendorEVCMap';
import VendorEVCMenu from './pages/VendorEVCMenu';
import VendorRequests from './pages/VendorRequests';
import VendorUpdateEVC from './pages/VendorUpdateEVC';

function App() {
  return(
    <Router>
      <Container>
        <Routes>
          {/* Marcus' Routes */}
          <Route path={"/"} element={<AdminHome />} />
          <Route path={"/home"} element={<HomePage/>} />
          <Route path={"/AdminCharger"} element={<AdminCharger />} />
          <Route path={"/AdminBookings"} element={<AdminBookings />} />
          <Route path={"/Requests"} element={<AdminRequests />} />
          
          {/* Tyler's Routes */}
          <Route path={'/Dashboard'} element={<VendorDashboard />}/>
          <Route path={'/MyBookings'} element={<VendorBookings />} />
          <Route path={'/MyRequests'} element={<VendorRequests />}/>
          <Route path={'/MyEVC'} element={<VendorEVCMap />}/>
          <Route path={"/MyEVC/Menu"} element= {<VendorEVCMenu />}/>
          <Route path={"MyEVC/Menu/AddEVC"} element={<VendorAddEVCRequest />}/>
          <Route path={"/MyEVC/Menu/UpdateEVC"} element={<VendorUpdateEVC />}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
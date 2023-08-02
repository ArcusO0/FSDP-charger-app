import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Requests from "./pages/Requests";
import EVCMenu from "./pages/EVCMenu";
import AddEVC from "./pages/AddEVC";
import UpdateEVC from "./pages/UpdateEVC";
import MyEVC from './pages/MyEVC';
import Dashboard from './pages/Dashboard'
import MyBookings from './pages/MyBookings';

function App() {
  return(
    <Router>
      <Container>
        <Routes>
          <Route path={'/'} element={<Dashboard />}/>
          <Route path={'/MyBookings'} element={<MyBookings />} />
          <Route path={'/MyRequests'} element={<Requests />}/>
          <Route path={'/MyEVC'} element={<MyEVC />}/>
          <Route path={"/MyEVC/Menu"} element= {<EVCMenu />}/>
          <Route path={"MyEVC/Menu/AddEVC"} element={<AddEVC />}/>
          <Route path={"/MyEVC/Menu/UpdateEVC"} element={<UpdateEVC />}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feedbacks from './pages/Feedbacks';
import AddFeedback from './pages/AddFeedback';
import EditFeedback from './pages/EditFeedback';
import Status from './pages/Status';
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';
import Bookings from './pages/Bookings';


function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar" id="navbar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <img src="/car.png" alt="" />
            </Link>
            <Link to="/bookings" ><Typography>Bookings</Typography></Link>
            <Link to="/rewards" ><Typography>Rewards</Typography></Link>
            <Link to="/status" ><Typography>Status</Typography></Link>
            <Link to="/map" ><Typography>Map</Typography></Link>
            <Link to="/feedbacks" ><Typography>Feedbacks</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Feedbacks />} />
          <Route path={"/feedbacks"} element={<Feedbacks />} />
          <Route path={"/addfeedback"} element={<AddFeedback />} />
          <Route path={"/editfeedback/:id"} element={<EditFeedback />} />
          <Route path={"/status"} element={<Status />} />
          <Route path={"/addbooking"} element={<AddBooking />} />
          <Route path={"/editbooking/:id"} element={<EditBooking />} />
          <Route path={"/bookings"} element={<Bookings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserFeedbacks from './pages/UserFeedbacks';
import AddUserFeedback from './pages/AddUserFeedback';
import EditUserFeedback from './pages/EditUserFeedback';
import UserStatus from './pages/UserStatus';
import AddUserBooking from './pages/AddUserBooking';
import EditUserBooking from './pages/EditUserBooking';
import UserBookings from './pages/UserBookings';


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
          <Route path={"/"} element={<UserFeedbacks />} />
          <Route path={"/feedbacks"} element={<UserFeedbacks />} />
          <Route path={"/addfeedback"} element={<AddUserFeedback />} />
          <Route path={"/editfeedback/:id"} element={<EditUserFeedback />} />
          <Route path={"/status"} element={<UserStatus/>} />
          <Route path={"/addbooking"} element={<AddUserBooking />} />
          <Route path={"/editbooking/:id"} element={<EditUserBooking />} />
          <Route path={"/bookings"} element={<UserBookings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

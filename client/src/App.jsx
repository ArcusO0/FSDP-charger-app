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
            <Link to="/userbookings" ><Typography>Bookings</Typography></Link>
            <Link to="/userrewards" ><Typography>Rewards</Typography></Link>
            <Link to="/userstatus" ><Typography>Status</Typography></Link>
            <Link to="/usermap" ><Typography>Map</Typography></Link>
            <Link to="/userfeedbacks" ><Typography>Feedbacks</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<UserFeedbacks />} />
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

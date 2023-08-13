import UserFeedbacks from './pages/UserFeedbacks';
import AddUserFeedback from './pages/AddUserFeedback';
import EditUserFeedback from './pages/EditUserFeedback';
import UserStatus from './pages/UserStatus';
import AddUserBooking from './pages/AddUserBooking';
import EditUserBooking from './pages/EditUserBooking';
import UserBookings from './pages/UserBookings';


function Customer() {
  return (
    // <Router>
    //   <AppBar position="static" className="AppBar" id="navbar">
    //     <Container>
    //       <Toolbar disableGutters={true}>
    //         <Link to="/">
    //           <img src="/car.png" alt="" />
    //         </Link>
    //         <Link to="/userbookings" ><Typography>Bookings</Typography></Link>
    //         <Link to="/userrewards" ><Typography>Rewards</Typography></Link>
    //         <Link to="/userstatus" ><Typography>Status</Typography></Link>
    //         <Link to="/usermap" ><Typography>Map</Typography></Link>
    //         <Link to="/userfeedbacks" ><Typography>Feedbacks</Typography></Link>
    //       </Toolbar>
    //     </Container>
    //   </AppBar>

    //   <Container>
    //     <Routes>
    //       <Route path={"/"} element={<UserFeedbacks />} />
    //       <Route path={"/userfeedbacks"} element={<UserFeedbacks />} />
    //       <Route path={"/adduserfeedback"} element={<AddUserFeedback />} />
    //       <Route path={"/edituserfeedback/:id"} element={<EditUserFeedback />} />
    //       <Route path={"/userstatus"} element={<UserStatus/>} />
    //       <Route path={"/adduserbooking"} element={<AddUserBooking />} />
    //       <Route path={"/edituserbooking/:id"} element={<EditUserBooking />} />
    //       <Route path={"/userbookings"} element={<UserBookings />} />
    //     </Routes>
    //   </Container>
    // </Router>
    <div className="navbarvendor">
            <img src="assets\logo.jpg" alt="" className='logo' />
            <div className='navbar-header'>
                <a href="/" className='gridv'><FontAwesomeIcon icon={faTableCellsLarge} /></a>
                <a href="/" className='bookv'><FontAwesomeIcon icon={faBook} /></a>
                <a href="/requests" className='chargerv'><FontAwesomeIcon icon={faBolt} /></a>
                <a href="/" className='settingsv'><FontAwesomeIcon icon={faGear} /></a>
                <a href="/" className='aboutv'><FontAwesomeIcon icon={faQuestionCircle} /></a>

            </div>
            <a href="/" className='userv'><FontAwesomeIcon icon={faUser} /></a>
        </div>
  );
}

export default Customer;

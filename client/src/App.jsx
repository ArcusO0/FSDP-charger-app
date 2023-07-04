import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feedbacks from './pages/Feedbacks';
import AddFeedback from './pages/AddFeedback';
import EditFeedback from './pages/EditFeedback';

function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                FSDP
              </Typography>
            </Link>
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
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

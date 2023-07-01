import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Requests from "./pages/Requests";

function App() {
  return(
    <Router>
      <Container>
        <Routes>
          <Route path={'/'} element={<Requests />}/>
          <Route path={'/requests'} element={<Requests />}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
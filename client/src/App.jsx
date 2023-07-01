import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';


function App() {
  return (
    <Router>
      
     
      

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

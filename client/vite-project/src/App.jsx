import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Requests from "./pages/Requests";
import EVCMenu from "./pages/EVCMenu";
import AddEVC from "./pages/AddEVC";
import UpdateEVC from "./pages/UpdateEVC";
 
function App() {
  return(
    <Router>
      <Container>
        <Routes>
          <Route path={'/'} element={<Requests />}/>
          <Route path={'/requests'} element={<Requests />}/>
          <Route path={"/MyEVC/Menu"} element= {<EVCMenu />}/>
          <Route path={"MyEVC/Menu/AddEVC"} element={<AddEVC/>}/>
          <Route path={"/MyEVC/Menu/UpdateEVC"} element={<UpdateEVC/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
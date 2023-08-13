import React, {useState, useEffect} from 'react';
import http from "../http"
import { Container, Box, Grid, Card, CardContent, Typography, Divider, 
createTheme, ThemeProvider, IconButton, Modal, Button} from '@mui/material';
import {ArrowBackIosRounded, CreateSharp, DeleteSharp } from '@mui/icons-material';
import { Link }from "react-router-dom";
import Sidebar from "../components/sidebar";
import DeleteModal from '../components/deleteModal';
import UpdateModal from "../components/updateModal";

function Requests() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
    },
  });

  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    http.get('/MyRequests').then((res) => {
      console.log(res.data);
      setRequestList(res.data);
    });
  },[]);

  const AddRequestList = requestList.filter(x => x.type === "Add");
  const DeleteRequestList = requestList.filter(x => x.type === "Delete");

  const sidebar = Sidebar();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <ThemeProvider theme={theme}>
      {sidebar}

      {/* Body Content */}
      <Box sx = {{ display: "flex" }}>
        <Box sx={{ml:-5, mt:3}} >
          <Link to="/Dashboard" sx={{color:'black'}}>
            <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}}/>
          </Link>
          <Typography variant="h4" sx ={{display: 'inline-block' ,fontWeight:"bold"}}>
            My Requests
          </Typography>

          {/* "Add" Requests */}
          <Box sx={{display: 'flex', mt: 5, pb: 0, maxHeight: 600}}>
            <Container>
              <Typography variant="h5">
                "Add" Requests 
              </Typography>
              <Container sx={{maxHeight: 500, overflowY: "auto", overflowX:"hidden", my: 3, ml: -2, pb:5}}>
                <Grid container spacing={2} sx={{pr: 5}} minWidth={500}>
                  {
                    AddRequestList.map((request, i) => {
                      return(
                        <Grid item lg={12} key={request.id}>
                          <Card sx={{ mt: 3, border: "solid 1px black"}}>
                            <CardContent>
                              <Typography variant="h6" sx={{mb: 2}}>
                                Request ID: {request.id}
                              </Typography>
                              <Typography variant="h6" sx={{mb: 2}}>
                                EV Charger Name: {request.name}
                              </Typography>
                              <Typography variant="h6" sx={{mb: 2}}>
                                Status: {request.status}
                              </Typography>

                              {/* Delete Button */}
                              <DeleteModal id={request.id} name={request.name} address={request.address} description={request.description} />

                              {/* Edit Button */}
                              <UpdateModal req_id={request.id} req_name={request.name} req_address={request.address} req_description={request.description} req_rate={request.rate}/>

                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                  }
                </Grid>
              </Container>
            </Container>

            <Divider orientation='vertical' sx={{ width:2, backgroundColor: '#707070', borderRadius: "2px", mx: 5, pb: 5}} flexItem/>
            
            {/* "Delete" Requests */}
            <Container>
              <Typography variant="h5">
                "Delete" Requests
              </Typography>
              <Container sx={{maxHeight: 500, overflowY: "auto", overflowX:"hidden", my: 3, ml: -2, pb:5}}>
                <Grid container spacing={2} sx={{pr:5}} minWidth={500}>
                  {
                    DeleteRequestList.map((request, i) => {
                      return(
                        <Grid item lg={12} key={request.id}>
                          <Card sx={{ mt: 3, border: "solid 1px black"}}>
                            <CardContent>
                              <Typography variant="h6" sx={{mb: 2}}>
                                Request ID: {request.id}
                              </Typography>
                              <Typography variant="h6" sx={{mb: 2}}>
                                EV Charger Name: {request.name}
                              </Typography>
                              <Typography variant="h6" sx={{mb: 2}}>
                                Status: {request.status}
                              </Typography>
                              
                              {/* Delete Button */}
                              <DeleteModal id={request.id} name={request.name} address={request.address} description={request.description} />

                              {/* Edit Button */}
                              <UpdateModal req_id={request.id} req_name={request.name} req_address={request.address} req_description={request.description} req_rate={request.rate}/>

                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                  }
                </Grid>
              </Container>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Requests
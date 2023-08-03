import React, {useState, useEffect} from 'react';
import http from "../http"
import { Container, Box, Grid, Card, CardContent, Typography, Divider, 
createTheme, ThemeProvider, IconButton, Modal, Button} from '@mui/material';
import {ArrowBackIosRounded, CreateSharp, DeleteSharp } from '@mui/icons-material';
import { Link }from "react-router-dom";
import Sidebar from "../components/sidebar";

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
  }, []);

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
                              <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}} onClick={handleOpen}>
                                  <DeleteSharp sx={{width: 30, height: 30, color: "red"}}/>
                              </IconButton>
                              
                              <Modal
                              open={open}
                              onClose={handleClose}
                              className={`A${request.id}`}                              
                              >
                                <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600,
                                    backgroundColor:'background.paper', border: '1px solid #000', boxShadow: 24, p: 4 }}>
                                    <Container>
                                        <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}} onClick={handleClose}/>
                                        <Typography variant="h5" sx={{ display:"inline-block", ml:"25%"}}>
                                            Delete Request
                                        </Typography>
                                    </Container>
                                    <Container sx={{p:5}} >
                                        <Typography>
                                            Selected Request Id: {request.id}
                                        </Typography>
                                        <Typography>
                                            EV Charger Name: {request.name}
                                        </Typography>
                                        <Typography>
                                            EV Charger Address {request.address}
                                        </Typography>
                                        <Typography>
                                            EV Charger Description {request.description}
                                        </Typography>
                                    </Container>
                                    <Button variant="contained" href={`/deleteRequest/${request.id}`} sx={{justifyContent:"center"}}>Delete Request</Button>
                                </Box>
                              </Modal>

                              {/* Edit Button */}
                              <Link to={`requests/updateRequest/${request.id}`}> 
                                <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}}>
                                  <CreateSharp sx={{width: 30, height: 30, color: "black"}}/>
                                </IconButton> 
                              </Link>
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
                              <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}} onClick={handleOpen}>
                                  <DeleteSharp sx={{width: 30, height: 30, color: "red"}}/>
                              </IconButton>
                              <Modal
                              open={open}
                              onClose={handleClose}
                              id={`D${request.id}`} 
                              >
                                <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600,
                                    backgroundColor:'background.paper', border: '1px solid #000', boxShadow: 24, p: 4 }}>
                                    <Container>
                                        <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}} onClick={handleClose}/>
                                        <Typography variant="h5" sx={{ display:"inline-block", ml:"25%"}}>
                                            Delete Request
                                        </Typography>
                                    </Container>
                                    <Container sx={{p:5}} >
                                        <Typography>
                                            Selected Request Id: {request.id}
                                        </Typography>
                                        <Typography>
                                            EV Charger Name: {request.name}
                                        </Typography>
                                        <Typography>
                                            EV Charger Address {request.address}
                                        </Typography>
                                        <Typography>
                                            EV Charger Description {request.description}
                                        </Typography>
                                    </Container>
                                </Box>
                              </Modal>

                              {/* Edit Button */}
                              <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}}>
                                <CreateSharp sx={{width: 30, height: 30, color: "black"}}/>
                              </IconButton> 

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
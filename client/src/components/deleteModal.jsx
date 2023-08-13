import React, {useState} from "react";
import {Box, Modal, Container, Typography, IconButton, Button} from "@mui/material";
import { ArrowBackIosRounded, DeleteSharp } from "@mui/icons-material";
import http from "../http";



function DeleteModal({id, name, address, description}) {
    const [open, setOpen] = React.useState(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const reloadPage = () => {
        window.location.reload();
    };
    
    return( 
      <React.Fragment>
        <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}} onClick={handleOpen}>
            <DeleteSharp sx={{width: 30, height: 30, color: "red"}}/>
        </IconButton>
        <Modal
        open={open}
        onClose={handleClose}                        
        >
          <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600,
              backgroundColor:'background.paper', border: '1px solid #000', boxShadow: 24, p: 4 }}>
              <Container>
                  <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}} onClick={handleClose}/>
                  <Typography variant="h5" sx={{ display:"inline-block", fontWeight:"bold", ml:"25%"}}>
                      Delete Request
                  </Typography>
              </Container>
              <Container sx={{p:5}} >
                  <Typography sx={{mt: 1, fontWeight:"bold"}}>
                      Selected Request Id: {id}
                  </Typography>
                  <Typography sx={{mt: 2, fontWeight:"bold"}}>
                      EV Charger Name: 
                  </Typography>
                  <Typography>
                    {name}
                  </Typography>
                  <Typography sx={{mt: 2, fontWeight:"bold"}}>
                      EV Charger Address: 
                  </Typography>
                  <Typography>
                    {address}
                  </Typography>
                  <Typography sx={{mt: 2, fontWeight:"bold"}}>
                      EV Charger Description:
                  </Typography>
                  <Typography>
                    {description}
                  </Typography>
              </Container>
              <Box sx={{display:"flex", justifyContent: "center"}}>
                <Button variant="contained" onClick={() => {http.delete(`/MyRequests/deleteRequest/${id}`).then(reloadPage).then(handleClose)}} sx={{ width: "80%", mt: 5, justifySelf:"center"}} color="error">Delete</Button>
              </Box>
              
          </Box>
        </Modal>  
      </React.Fragment>
    )
  }

export default DeleteModal;
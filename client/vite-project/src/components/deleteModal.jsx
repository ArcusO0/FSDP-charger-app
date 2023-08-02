import React, {useState} from "react";
import {Box, Modal, Container, Typography, IconButton} from "@mui/material";
import { ArrowBackIosRounded, DeleteSharp } from "@mui/icons-material";


function DeleteModal(id, name, add, desc) {
    const [open, setOpen] = React.useState(false); 
    const deleteOpen = () => setOpen(true);
    const deleteClose = () => setOpen(false);
    return(
        <Box>
            <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}} onClick={deleteOpen}>
                <DeleteSharp sx={{width: 30, height: 30, color: "red"}}/>
            </IconButton>
            <Modal
            open={open}
            onClose={deleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600,
                backgroundColor:'background.paper', border: '1px solid #000', boxShadow: 24, p: 4 }}>
                <Container sx={{}}>
                    <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}} onClick={deleteClose}/>
                    <Typography id="modal-modal-title" variant="h5" sx={{ display:"inline-block", ml:"25%"}}>
                        Delete Request
                    </Typography>
                </Container>
                <Container>
                    <Typography>
                        Selected Request Id: {id}
                    </Typography>
                    <Typography>
                        EV Charger Name: {name}
                    </Typography>
                    <Typography>
                        EV Charger Address {add}
                    </Typography>
                    <Typography>
                        EV Charger Description {desc}
                    </Typography>
                </Container>
            </Box>
            </Modal>
        </Box>
    )
}

export default DeleteModal;
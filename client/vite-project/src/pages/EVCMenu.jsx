import React, {useState, useEffect} from 'react';
import {ThemeProvider, createTheme, Box, Typography, Card, Grid} from "@mui/material";
import {ArrowBackIosRounded, AddCircle, CreateSharp, DeleteSharp} from "@mui/icons-material";
import http from "../http";
import Sidebar from "../sidebar";
import { Link } from 'react-router-dom';

function EVCMenu() {
    const theme = createTheme({
        typography: {
          fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
        },
    });

    const sidebar = Sidebar();
  return (
    <ThemeProvider theme={theme}>
        {sidebar}
        <Box>
            {/* Header Content */}
            <Box sx={{ml:-5, mt:3}} >
                <Link to="/" sx={{color:'black'}}>
                    <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}}/>
                </Link>
                <Typography variant="h4" sx ={{display: 'inline-block', fontWeight: "bold"}}>
                    My EV Chargers
                </Typography>
            </Box>
        
            {/* Body Content */}
            <Box sx={{mt: 5}}>
                {/* Register New EV Chargers Button */}
                <Typography variant="h5">
                    Register New EV Chargers
                </Typography>
                <Link to={"/MyEVC/Menu/AddEVC"}>
                    <Card sx={{minHeight: 200, bgcolor:"#9BB1C3", mt: 2, display:"flex", justifyContent:"center",alignItems:"center"}}>
                        <AddCircle sx={{height: 70, width: 70}}/> 
                    </Card>
                </Link>
            </Box>
            <Grid item xs={6} sx={{mt: 4}}>
                <Box sx={{display:"inline-block", minWidth: "48%"}}>
                    {/* Update EV Charger Information */}
                    <Typography variant="h5">
                        Update EV Charger Information
                    </Typography>
                    <Link to={"/MyEVC/Menu/UpdateEVC"}>
                        <Card sx={{minHeight: 200, bgcolor:"#9BB1C3", mt: 2, display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <CreateSharp sx={{height: 70, width: 70}}/> 
                        </Card>
                    </Link>
                </Box>
                <Box sx={{display:"inline-block", minWidth:"48%", ml:"4%"}}>
                    {/* Delete EV Charger */}
                    <Typography variant="h5">
                        Delete EV Chargers
                    </Typography>
                    <Card sx={{minHeight: 200, bgcolor:"#9BB1C3", mt: 2, display:"flex", justifyContent:"center",alignItems:"center"}}>
                        <DeleteSharp sx={{height: 70, width: 70}}/> 
                    </Card>
                </Box>
            </Grid>
        </Box>
    </ThemeProvider> 
  )
}

export default EVCMenu;
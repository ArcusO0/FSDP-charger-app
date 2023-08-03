import React, {useEffect, useState} from 'react';
import {ThemeProvider, createTheme, Container, Card, Typography, Box, Button,
Link, Grid, Rating} from '@mui/material';
import {StarRounded, Send} from "@mui/icons-material";
import Sidebar from '../components/sidebar';
import http from "../http";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
    },
    
  });

  const navigate = useNavigate();
  const sidebar = Sidebar();
  
  // Date Object
  const DateObj = new Date();
  const displayDate = DateObj.toDateString().slice(4);

  // Get Booking information from db
  const [bookingList, setBookingList] = useState([]);
  
  useEffect(() => {
    http.get("/MyBookings").then((res) => {
      console.log(res.data);
      setBookingList(res.data);
    });
  }, []);

  const count = bookingList.length;
  const commissionSum = bookingList.map(attr => parseFloat(attr.bookingPrice)).reduce((sum, val) => sum + val, 0);

  // Get EVC information from db 
  const [evcList, setEVCList] = useState([]);

  useEffect(() => {
    http.get("/MyEVC").then((res) => {
      console.log(res.data);
      setEVCList(res.data);
    });
  }, []);

  function calcStatusPercent(status) {
    const statusCount = evcList.filter((evc) => evc.status == status).length;
    const percent = statusCount / evcList.length;
    if (!percent) {
      return 0;
    }
    return percent * 100;
  }

  function calcAvgRating() { 
    const sumRatingList = evcList.map((evc) => parseFloat(evc.rating)).reduce((sum, val) => sum + val, 0);
    const evcListCount = evcList.length;
    const avgRating = sumRatingList / evcListCount;
    if (!avgRating) {
      return 0
    }
    return avgRating;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {sidebar}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{textAlign:"center", mt: 3, bgcolor:"#9BB1C3", minWidth: "100%"}}>
              <Typography variant="h3" sx={{pt: 8,pb: 1, fontWeight: "bold"}}>
                ${commissionSum}
              </Typography>
              <Typography variant="h4" sx={{pb: 8, fontWeight: "bold"}}>
                Balance as at {displayDate} 
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} onClick={() => navigate("/MyBookings")}>
            <Card sx={{textAlign:"center", border:"1px solid black", width: "100%"}}>
              <Typography variant="h3" sx={{pt: 5, fontWeight: "bold"}}>
                {count}
              </Typography>
              <Typography variant="h3" sx={{pb: 5, fontWeight: "bold"}}>
                Bookings
              </Typography>
              <Box sx={{float:"right", p:0, mt:-4}}>
                <Button sx={{p:0, pb: 1}}>D</Button>
                <Button sx={{p:0, pb: 1}}>M</Button>
                <Button sx={{p:0, pb: 1}}>Y</Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{border:"1px solid black", width: "100%"}}>
              <Typography variant="h6" sx={{fontWeight:"bold", mt:4, ml:5, mb: 2.5}}>
                EV Charger Rating (AVG)
              </Typography>
              <Typography variant="h5" sx={{fontWeight:"bold", pl: 5}}>
                {calcAvgRating()} / 5 
              </Typography>
              <Box sx={{pl: 4, pt: 1}}>
                <Rating name="read-only" value={calcAvgRating()} precision={0.1} size="large" sx={{color:"#9BB1C3"}} readOnly/>
                <Button variant="contained" sx={{bgcolor:"#9BB1C3", float:"right", mb:4, mr: 5}}>Read Reviews</Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{textAlign:"center", border:"1px solid black", width: "100%"}}>
              <Typography variant="h6" sx={{fontWeight:"bold", pt: 2}}>
                EV Charger Status
              </Typography>
              <Container sx={{p:5}}>
                <Box sx={{display: "inline-block"}}>
                  <Typography sx={{textAlign: "center", display: "block"}}>Good</Typography>
                  <Card sx={{bgcolor:"#67F65C", width: "80px", height: "20px", display:"block"}}/>
                  <Typography sx={{textAlign: "center", display: "block"}}>{calcStatusPercent("Good")}%</Typography>
                </Box>
                <Box sx={{display: "inline-block", pl:5}}>
                  <Typography sx={{textAlign: "center", display: "block"}}>Poor</Typography>
                  <Card sx={{bgcolor:"#F9B459", width: "80px", height: "20px", display:"block"}}/>
                  <Typography sx={{textAlign: "center", display: "block"}}>{calcStatusPercent("Poor")}%</Typography>
                </Box>
                <Box sx={{display: "inline-block", pl: 5}}>
                  <Typography sx={{textAlign: "center", display: "block"}}>Critical</Typography>
                  <Card sx={{bgcolor:"#FF6868", width: "80px", height: "20px", display:"block"}}/>
                  <Typography sx={{textAlign: "center", display: "block"}}>{calcStatusPercent("Critical")}%</Typography>
                </Box>
              </Container>
            </Card>
          </Grid>
          <Grid item xs={6} onClick={() => navigate("/MyRequests")}>
            <Card sx={{border:"1px solid black", width: "100%"}}>
              <Box sx={{display:"flex", p: 8.7, alignItems:"center"}}>
                <Send sx={{transform:"rotate(-40deg)", display: "inline-block", mr: 2, ml:5, width:"65px" , height: "55px"}}/>
                <Typography variant="h5" sx={{fontWeight:"bold", display: "inline-block"}}>
                  My Requests
                </Typography>
              </Box>              
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Dashboard
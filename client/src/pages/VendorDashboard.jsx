import React, {useEffect, useState} from 'react';
import {ThemeProvider, createTheme, Container, Card, Typography, Box, Button,
Link, Grid, Rating, Dialog, IconButton} from '@mui/material';
import {StarRounded, Send, Close} from "@mui/icons-material";
import Sidebar from '../components/sidebar';
import http from "../http";
import { useNavigate } from 'react-router-dom';
import CanvasJSReact from "@canvasjs/react-charts";

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

  const initialCount = bookingList.length;

  function perDay() {
    const count = bookingList.filter((booking) => new Date(booking.createdAt).toDateString().slice(0,10) == DateObj.toDateString().slice(0,10)).length;
    return count;
  }

  function perMonth() {
    const startDate = new Date();
    startDate.setDate(DateObj.getDate() - 30);
    console.log(startDate);
    const count = bookingList.filter((booking) => new Date(booking.createdAt) > startDate).length;
    return count
  }

  function perYear() {
    const startDate = new Date();
    startDate.setFullYear(DateObj.getFullYear() - 1);
    console.log(startDate);
    const count = bookingList.filter((booking) => new Date(booking.createdAt) > startDate).length;
    return count
  }

  function changeCount(newCount) {
    var count = document.getElementById("bookingCount");
    if (count.innerHTML != initialCount) {
      count.innerHTML = initialCount;
    }
    else {
      count.innerHTML = newCount;
    }
  }
  
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
    const percent = (statusCount / evcList.length) * 100;
    if (!percent) {
      return 0;
    }
    return percent.toFixed(1);
  }

  function calcAvgRating() { 
    const sumRatingList = evcList.map((evc) => parseFloat(evc.rating)).reduce((sum, val) => sum + val, 0);
    const evcListCount = evcList.length;
    const avgRating = sumRatingList / evcListCount;
    if (!avgRating) {
      return 0
    }
    return avgRating.toFixed(2);
  }

  // Graph (Canvas JS)
  function generateCommissionData() {
    var dataList = []
    var dataDict = {};
    for (var i in bookingList) {
      const bookingDate = bookingList[i].createdAt;
      const bookPrice = parseFloat(bookingList[i].bookingPrice);
      if (dataDict[bookingDate]) {
        dataDict[bookingDate] += bookPrice;  
      }
      else {
        dataDict[bookingDate] = bookPrice
      }
    }
    for (var i in dataDict) {
      dataList.push({ y: dataDict[i], label: new Date(i).toDateString().slice(4)});
    }
    console.log(dataList);
    return dataList
  };

  function generateCommissionChart() {
    var dataList = generateCommissionData();
    console.log(dataList);
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Commission Earned"
      },
      axisY: {
        title: "Commission",
        prefix: "$"
      },
      axisX: {
        title: "Day",
        labelFontSize:15 
      },
      data: [
        {
          type: "line",
          toolTipContent: "{label}: ${y}",
          dataPoints: dataList
        }
      ]
    }
    return (
      <CanvasJSChart options = {options}/>
    )
  }
  const commissionChart = generateCommissionChart();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {sidebar}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{textAlign:"center", mt: 3, bgcolor:"#9BB1C3", minWidth: "100%"}} onClick={handleOpen}>
              <Typography variant="h3" sx={{pt: 8,pb: 1, fontWeight: "bold"}}>
                ${commissionSum}
              </Typography>
              <Typography variant="h4" sx={{pb: 8, fontWeight: "bold"}}>
                Balance as at {displayDate} 
              </Typography>
            </Card>
            <Dialog 
            fullScreen
            open={open}
            onClose={handleClose}
            >
              <Box sx={{p:4}}>
                <IconButton onClick={handleClose}>
                  <Close/>
                </IconButton>
                {commissionChart}
                <Typography sx={{mt: 3, ml: 1}}>
                  Some Regression Information
                </Typography>
              </Box>
            </Dialog>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{textAlign:"center", border:"1px solid black", width: "100%"}}>
              <Box onClick={() => navigate("/MyBookings")}>
                <Typography variant="h3" id="bookingCount" sx={{pt: 5, fontWeight: "bold"}}>
                  {initialCount}
                </Typography>
                <Typography variant="h3" sx={{pb: 5, fontWeight: "bold"}}>
                  Bookings
                </Typography>
              </Box>
              <Box sx={{float:"right", p:0, mt:-4}}>
                <Button id="D" sx={{p:0, pb: 1}} onClick={() => changeCount(perDay())}>D</Button>
                <Button id="M" sx={{p:0, pb: 1}} onClick={() => changeCount(perMonth())}>M</Button>
                <Button id="Y" sx={{p:0, pb: 1}} onClick={() => changeCount(perYear())}>Y</Button>
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
            <Card sx={{border:"1px solid black", width: "100%",cursor:"pointer"}}>
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

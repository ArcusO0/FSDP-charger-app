import React, { useEffect, useRef, useState } from 'react'
import {ThemeProvider, createTheme, Box, Container, Card, CardContent, Typography, Grid, Rating} from "@mui/material";
import { MoreHorizRounded, StarHalf } from '@mui/icons-material';
import http from "../http";
import mapboxgl from 'mapbox-gl'; 
import Sidebar from "../components/sidebar";
import { Link } from 'react-router-dom';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
function MyEVC() {
    const sidebar = Sidebar();
    const theme = createTheme({
      typography: {
        fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
      },
      
    });

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(103.83);
    const [lat, setLat] = useState(1.35);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          accessToken: "pk.eyJ1IjoiMjIwNDUycCIsImEiOiJjbGp6N2Y0bnkwOWN1M2RwZjY0eXIyc2p0In0.1hf_MKi69G4xSU6zQGrOcA",
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [lng, lat],
          zoom: zoom,
        });
    });
    
    const[evcList, setEVCList] = useState([]);

    useEffect(() => {
        http.get('/MyEVC').then((res) => {
            console.log(res.data);
            setEVCList(res.data);
        });
    }, []);

    const[bookList, setBookList] = useState([]);
    
    useEffect(()=>{
      http.get("/MyBookings").then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
    }, [])
 
    const [evc, setEVC] = useState({
        vendorId: "",
        chargerId: "",
        name: "",
        address: "",
        rate: "",
        description: "",
        rating: "",
        status: ""
    });

    function setID(evcID) {
        const id = evcID
        http.get(`/MyEVC/${id}`).then((res) => {
        console.log(res.data);
        setEVC(res.data);
        });
    }

    function setBorderColor(status) {
      if (status == "Good") {
        return "#67F65C";
      }
      else if (status == "Poor") {
        return "#F9B459";
      }
      else if (status == "Critical") {
        return "#FF6868";
      }
    }

    function totalEarned(evcID) {
      const total = bookList.filter((booking)=> booking.evcId == evcID).map((booking)=> parseFloat(booking.bookingPrice)).reduce((sum, val) => sum + val, 0);
      return total;
    }

      return (
        <ThemeProvider theme={theme}>
          <Container sx={{p:0, m:0, display:"flex", position:"relative", left:"-8.5vw"}}>
            {sidebar}
            <Box sx={{minWidth:"90%", minHeight: "706px", display:"inline-block"}}>
              <Container ref={mapContainer} className="map-container" sx={{minHeight: "706px"}} />
            </Box>
            <Box sx={{display: "inline-block", minWidth:"40%"}}>
              <Container sx={{textAlign:"center", alignItems:"center"}}>
                <Typography variant="h4" sx={{fontWeight:"bold", mt: 3, mr: 2, display:"inline-block" }}>
                  My EV Chargers 
                </Typography>
                <Link to="/MyEVC/Menu">
                  <MoreHorizRounded sx={{height: "30px", width: "30px"}}/>
                </Link>
              </Container>
              <Container sx={{maxHeight: 550, overflowY: "auto", overflowX:"hidden", my: 3, pb:5}}>
                  <Grid container spacing={2} sx={{pr:5, minWidth:450}} >
                      {
                          evcList.map((evc, i) => {
                              return(
                                  <Grid item lg={12} key={evc.id}>
                                      <Card sx={{ mt: 3, border: `solid 2px ${setBorderColor(evc.status)}`}} onClick={() => {setID(evc.id)}}>
                                          <CardContent>
                                              <Typography variant="h6" sx={{mb: 2}}>
                                                  EV Charger Name: {evc.name}
                                              </Typography>
                                              <Rating name="read-only" precision={0.1} size="large" value={parseFloat(evc.rating)} sx={{color:"#9BB1C3"}} readOnly/>
                                              <Typography sx={{mb: 2}}>
                                                  Commission Earned: ${totalEarned(evc.chargerId)}
                                              </Typography>
                                          </CardContent>
                                      </Card>
                                  </Grid>
                              )
                          })
                      }           
                  </Grid>
              </Container>
            </Box>
          </Container>
        </ThemeProvider>
        
      );
    }

export default MyEVC
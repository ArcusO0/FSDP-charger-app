import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThemeProvider, createTheme, Box, Typography, Card, CardContent, Grid, Dialog, 
    DialogActions, DialogContent, DialogContentText, DialogTitle, Button, 
    Container, Input, Rating, TextField} from "@mui/material";
import {ArrowBackIosRounded, AddCircle, CreateSharp, DeleteSharp, StarHalf} from "@mui/icons-material";
import http from "../http";
import { useFormik }from "formik";
import Sidebar from "../components/sidebar";
import { Link } from 'react-router-dom';

function EVCMenu() {
    const theme = createTheme({
        typography: {
          fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
        },
        palette: {
            defButton: {
              main: "#9BB1C3",
              contrastText: "#FFFFFF"
            }
        }
    });

    const sidebar = Sidebar();
    
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const [search, setSearch] = useState("");
    
    const[evcList, setEVCList] = useState([]);

    useEffect(() => {
        http.get('/MyEVC').then((res) => {
            console.log(res.data);
            setEVCList(res.data);
        });
    }, []);

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

    const[bookList, setBookList] = useState([]);
    
    useEffect(()=>{
      http.get("/MyBookings").then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
    }, [])

    const formik = useFormik({
        initialValues: { 
            reqId: "1",
            type: "Delete",
            addOrDelete: true,
            name: evc.name,
            address: evc.address,
            rate: evc.bookingRate,
            description: evc.description,
            status: "Pending"
        },
        enableReinitialize: true,
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.address = data.address.trim();
            if (data.description) {
                data.description = data.description.trim();
            }
            console.log(data);
            http.post(`/MyRequests/addRequest`, data)
            .then((res) => {
                console.log(res.data);
                navigate('/MyRequests');
            });
        }
    });

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
        {sidebar}
        <Box>
            {/* Header Content */}
            <Box sx={{ml:-5, mt:3}} >
                <Link to="/MyEVC" sx={{color:'black'}}>
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
                    <Card sx={{minHeight: 200, bgcolor:"#9BB1C3", mt: 2, display:"flex", justifyContent:"center",alignItems:"center"}} onClick={handleClickOpen}>
                        <DeleteSharp sx={{height: 70, width: 70}}/> 
                    </Card>
                    <Dialog open={open} onClose={handleClose}>
                        <Box sx={{ p:1 }}>
                            <Box sx={{display:"flex", justifyContent:"center", alignItems:'center'}}>
                                <ArrowBackIosRounded sx={{ position: 'relative', float:'left'}} onClick={handleClose}/>
                                <DialogTitle variant="h5" sx= {{display: "inline-block", fontWeight:"bold"}}>Delete EV Chargers</DialogTitle>    
                            </Box>                    
                            <DialogContent sx={{justifyContent: "center"}}>
                                <DialogContentText sx={{mb:2}}>
                                    *EV Chargers will be deleted after admin approval
                                </DialogContentText>
                                <Typography>
                                    Select EV Charger to Update:
                                </Typography>
                                <Input value={search} placeholder="Search" sx={{minWidth: "95%", border: "1px solid black", borderRadius: 1, mt: 1, p: 0.5}}/>
                                {/* Request Selection */}
                                <Container sx={{maxHeight: 300, overflowY: "auto", overflowX:"hidden", my: 3, ml: -2, pb:5}}>
                                    <Grid container spacing={2} sx={{maxWidth:450}} >
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
                            </DialogContent>
                            <DialogActions sx={{justifyContent: "center"}}>
                                <Container component="form" onSubmit={formik.handleSubmit}>
                                    <Box sx={{display:"none"}}>
                                        <TextField
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        />
                                        <TextField
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        />
                                        <TextField
                                        name="rate"
                                        value={formik.values.rate}
                                        onChange={formik.handleChange}
                                        />
                                        <TextField
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        />
                                    </Box>
                                    <Button type='submit' variant='contained' sx={{width:"90%"}} color="error">Delete</Button>
                                </Container>
                                
                            </DialogActions>
                        </Box>
                    </Dialog>
                </Box>
            </Grid>
        </Box>
    </ThemeProvider> 
  )
}

export default EVCMenu;
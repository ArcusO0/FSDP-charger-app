import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThemeProvider, createTheme, Box, Typography, Card, CardContent, Grid, Dialog, 
    DialogActions, DialogContent, DialogContentText, DialogTitle, Button, 
    Container, Input} from "@mui/material";
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

    const formik = useFormik({
        initialValues: { 
            type: "Delete",
            name: evc.name,
            address: evc.address,
            rate: evc.rate,
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
                        <Box sx={{ p:2}}>
                            <ArrowBackIosRounded sx={{ display: 'inline-block', position: 'relative', top: 4}} onClick={handleClose}/>
                            <DialogTitle variant="h5" sx= {{display: "inline-block", fontWeight:"bold"}}>Delete EV Chargers</DialogTitle>
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
                                                        <Card sx={{ mt: 3, border: "solid 1px black"}} onClick={() => {setID(evc.id)}}>
                                                            <CardContent>
                                                                <Typography variant="h6" sx={{mb: 2}}>
                                                                    EV Charger Name: {evc.name}
                                                                </Typography>
                                                                <Typography variant="h6" sx={{mb: 2}}>
                                                                    {/* Ratings */}
                                                                </Typography>
                                                                <Typography sx={{mb: 2, display: "flex", justifySelf: 'center'}}>
                                                                    <StarHalf sx={{mr: 1}}/> Reviews
                                                                </Typography>
                                                                <Typography sx={{mb: 2}}>
                                                                    Commission Earned 
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
                                        <Input
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        />
                                        <Input
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        />
                                        <Input
                                        name="rate"
                                        value={formik.values.rate}
                                        onChange={formik.handleChange}
                                        />
                                        <Input
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        />
                                    </Box>
                                    <Button type='submit' variant='contained' sx={{width:"90%", bgcolor: "#9BB1C3"}}>Delete</Button>
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
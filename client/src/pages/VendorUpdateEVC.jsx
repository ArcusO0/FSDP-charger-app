import React, { useState, useEffect} from 'react';
import { Link, useNavigate} from "react-router-dom";
import { ThemeProvider, createTheme, Box, Typography, Input, Grid, Card, CardContent, Container, TextField, Button, InputAdornment,
Rating} from '@mui/material';
import { ArrowBackIosRounded, StarHalf } from "@mui/icons-material";
import { useFormik }from "formik";
import * as yup from "yup";
import http from "../http";
import Sidebar from '../components/sidebar';

function UpdateEVC() {
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
        bookingRate: "",
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

    const [search, setSearch] = useState("");

    const formik = useFormik({
        initialValues: evc,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            name: yup.string().trim()
                .min(3, "Name must be at least 3 characters")
                .max(100, "Name must be at most 100 characters")
                .required("Name is required"),
            description: yup.string().trim()
                .max(500, "Description must be at most 500 characters"),
            address: yup.string().trim()
                .min(3, "Address must be at least 3 characters")
                .max(500, "Address must be at most 500 characters")
                .required("Address is required"),
            bookingRate: yup.string()
                .test('is-decimal', 
                    'Invalid rate, enter a decimal value with 2 decimal places', 
                    (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/))
                .required("Rate is required")
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.address = data.address.trim();
            if (data.description) {
                data.description = data.description.trim();
            }
            console.log(data);
            http.put(`/MyEVC/updateEVC/${evc.id}`, data)
            .then((res) => {
                console.log(res.data);
                navigate('/MyEVC/Menu');
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
            <Box sx={{display: "flex"}}>
                {/* Body Content */}
                <Box sx={{ml:-5, mt:3}} >
                    <Link to="/MyEVC/Menu" sx={{color:'black'}}>
                        <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}}/>
                    </Link>
                    <Typography variant="h4" sx ={{display: 'inline-block', fontWeight: "bold"}}>
                        Update EV Charger Info
                    </Typography>

                    {/* Request Selection */}
                    <Box sx={{display: 'flex', mt: 5, pb: 0, maxHeight: 400}}>
                        <Container sx={{width: "48%"}}>
                            <Typography variant="h5">
                                Select EV Charger to Update:
                            </Typography>
                            <Input value={search} placeholder="Search" sx={{minWidth: "100%", border: "1px solid black", borderRadius: 1, mt: 1, p: 0.5}}/>
                            <Container sx={{maxHeight: 400, overflowY: "auto", overflowX:"hidden", my: 3, ml: -2, pb:5}}>
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
                        </Container>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ml: 5}}>
                            <Grid item xs={8} sx={{display:"flex-column", mt: 5}}> 
                                <TextField 
                                autoComplete='off'
                                fullWidth
                                margin="normal"
                                label="EV Charger Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                />

                                <TextField
                                autoComplete='off'
                                fullWidth
                                margin="normal"
                                label="EV Charger Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                />

                                <TextField
                                autoComplete='off'
                                fullWidth
                                margin="normal"
                                label="EV Charger Rate"
                                name="bookingRate"
                                value={formik.values.bookingRate}
                                onChange={formik.handleChange}
                                error={formik.touched.bookingRate && Boolean(formik.errors.bookingRate)}
                                helperText={formik.touched.bookingRate && formik.errors.bookingRate}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                />           
                                
                                <TextField
                                autoComplete='off'
                                fullWidth
                                margin="normal"
                                multiline
                                minRows={4}
                                label="EV Charger Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                />         
                            </Grid>
                            <Box sx={{mt: 5}}>
                                <Button variant="contained" type="submit" sx={{px:5, py: 1, float:"right"}} color="defButton" anchor="bottom">
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    )
}

export default UpdateEVC
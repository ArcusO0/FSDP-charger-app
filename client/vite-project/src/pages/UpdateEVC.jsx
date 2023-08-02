import React, { useState, useEffect} from 'react';
import { Link, useNavigate} from "react-router-dom";
import { ThemeProvider, createTheme, Box, Typography, Input, Grid, Card, CardContent, Container, TextField, Button, InputAdornment} from '@mui/material';
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
            rate: yup.string()
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
                                name="rate"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                                error={formik.touched.rate && Boolean(formik.errors.rate)}
                                helperText={formik.touched.rate && formik.errors.rate}
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
                                <Button variant="contained" type="Submit" sx={{px:5, py: 1, bgcolor: "#9BB1C3", float:"right"}} anchor="bottom">
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
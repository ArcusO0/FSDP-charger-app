import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import {ThemeProvider, createTheme, Box, Typography, Grid, TextField, Button, InputAdornment, Card} from '@mui/material';
import {ArrowBackIosRounded} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import http from "../http";
import Sidebar from '../components/sidebar';

{/* Add EVC Requests, Send a request to admin side (Marcus) for approval. Once approved, requests will be turned into EVC objects,
request status cahnges to "Approved" and content is sent to actual registration of EVC in database, then it is displayed on the map*/}

function AddEVC() {
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
        },
    });

    const sidebar = Sidebar();

    const formik = useFormik({
        initialValues: {
            type: "Add",
            name: "",
            address: "",
            rate: "",
            description: "",
            status: "Pending"
        },
        validationSchema: yup.object().shape({
            name: yup.string().trim()
                .min(3, "Name must be at least 3 characters")
                .max(100, "Name must be at most 100 characters")
                .required("Name is required"),
            address: yup.string().trim()
                .min(3, "Name must be at least 3 characters")
                .max(500, "Name must be at most 100 characters")
                .required("Name is required"),
            rate: yup.string()
                .test(
                    'is-decimal',
                    'Invalid rate, enter a decimal value with 2 decimal places',
                    (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)
                    ),
            description: yup.string().trim()
                .max(500, "Description must be at most 500 characters")
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.address = data.address.trim();
            if (data.description) {
                data.description = data.description.trim();
            }
            console.log(data)
            http.post("/MyRequests/addRequest", data)
            .then((res) => {
                console.log(res.data);
                navigate('/MyRequests')
            })
        }
    })

  return (
    <ThemeProvider theme={theme}>
        {sidebar}
        {/* Header Content */}
        <Box sx={{ml:-5, mt:3}} >
            <Link to="/MyEVC/Menu" sx={{color:'black'}}>
                <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}}/>
            </Link>
            <Typography variant="h4" sx ={{display: 'inline-block', fontWeight: "bold"}}>
                Register New EV Charger
            </Typography>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{maxWidth:"70%", display: "inline-block"}}>
             <Grid item xs={8} sx={{display:"flex-column", mt: 5}}>
                <TextField 
                autoComplete='off'
                margin="normal"
                label="EV Charger Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{minWidth: "90%"}}/>
                
                <TextField
                autoComplete='off'
                margin="normal"
                label="EV Charger Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                sx={{minWidth: "90%"}}/>

                <TextField
                autoComplete='off'
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
                sx={{minWidth: "90%"}}/>

                <TextField
                autoComplete='off'
                margin="normal"
                multiline
                minRows={4}
                label="EV Charger Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                sx={{minWidth: "90%"}}/>
             </Grid>
             <Box sx={{mt: 5}}>
                <Button variant="contained" type="submit" sx={{px:5, py: 1, bgcolor: "#9BB1C3"}} anchor="bottom">
                    Submit
                </Button>
             </Box>
        </Box>
        <Card variant="outlined" sx={{display: "inline-block", float:"right", maxWidth:"25%", mt: 7}}>
            <Box sx={{p: 3}}>
                <Typography sx={{mb: 3, fontWeight:"bold"}}>
                    Notice:
                </Typography>
                <Typography sx={{pb: 19}}>
                    Registration of new EV Chargers (EVC) may take 1-2 working days before admin are able to approve the registration of new EVCs.
                </Typography>
            </Box>
        </Card>
    </ThemeProvider>
  )
}

export default AddEVC
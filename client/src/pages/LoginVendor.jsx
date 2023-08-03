import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from './vendorbg.jpeg';
import Navbarvendor from './navbar/navbarvendor';


function Loginvendor() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "", 
            password: ""
        },
        validationSchema: yup.object().shape({
            name: yup.string().trim()
                .matches(/^[a-z ,.'-]+$/i, 'Invalid name')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),
            password: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required')
        }),
        onSubmit: (data) => {
            data.name = data.name.trim()
            data.password = data.password.trim();
            http.post("/vendor/login", data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    navigate("/");
                    window.location.reload();
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });


    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px',
            border: '1px solid #ccc',
            padding: '20px',
            maxWidth: '500px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '150px 150 px', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <>
                <Navbarvendor /> 
            </>
            <Typography variant="h5" sx={{ my: 2 }}>
                Vendor Sign In
            </Typography>
            <Typography variant="body1" sx={{ my: 1, textAlign: 'center' }}>
                Please fill in your detail to access your account.
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    name="name" size='small' 
                    value={formik.values.name} 
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)} 
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Password"
                    name="password" type="password" size='small'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        color="primary"
                    />
                    <Typography variant="body2">Remember Me</Typography>
                    <Box sx={{ flexGrow: 2 }} /> {/* For spacing */}
                    <Typography variant="body2">
                        <a href="/forgot-password">Forgot Password?</a>
                    </Typography>
                </Box>

                <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                    Sign In
                </Button>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Dont have an account? <a href="/Login#/RegisterVendor">Sign Up</a>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Are you a user? <a href="/Login#/Login">Click Here!</a>
                </Typography>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default Loginvendor;
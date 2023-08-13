import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from './userbg.jpeg';


function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object().shape({
            name: yup.string().trim()
                .matches(/^[a-z ,.'-]+$/i, 'Invalid name')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),
            email: yup.string().trim()
                .email('Enter a valid email')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            password: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required'),
            confirmPassword: yup.string().trim()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post("/user/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    return (
        <Box
            sx={{
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
            <Typography variant="h5" sx={{ my: 2 }}>
                Account Sign Up
            </Typography>
            <Typography variant="body1" sx={{ my: 1, textAlign: 'center' }}>
                Please fill in your detail to create your account.
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    name="name" size="small"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Email"
                    name="email" size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Password"
                    name="password" type="password" size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Confirm Password"
                    name="confirmPassword" type="password" size="small"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Sign Up
                </Button>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Already have an account? <a href="/Login#/Login">Sign In</a>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Are you a vendor? <a href="/Login#/LoginVendor">Click Here!</a>
                </Typography>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default Register;
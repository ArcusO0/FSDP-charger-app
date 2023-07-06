import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function AddBooking() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string().trim()
                .min(3, 'email is too short')
                .max(320, 'email is too long')
                .email("Invalid Email")
                .required('Email is required'),
            license: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            hours: yup.number()
                .min(1, 'Must book at least 1 hour')
                .max(12, '12 hours maximum')
                .required('Hours is required')
                .integer("Must be an integer"),
            arrival: yup.string().trim()
                .min(5, 'Arrival must be 5 characters')
                .max(5, 'Arrival must be 5 characters')
                .required('Time of arrival is required'),
        }),
        onSubmit: (data) => {
            data.email = data.email.trim();
            data.license = data.license.trim();
            data.hours = data.hours.trim();
            data.arrival = data.arrival.trim();
            http.post("/booking", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/bookings");
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Booking
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="License"
                    name="license"
                    value={formik.values.license}
                    onChange={formik.handleChange}
                    error={formik.touched.license && Boolean(formik.errors.license)}
                    helperText={formik.touched.license && formik.errors.license}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Hours"
                    name="hours"
                    value={formik.values.hours}
                    onChange={formik.handleChange}
                    error={formik.touched.hours && Boolean(formik.errors.hours)}
                    helperText={formik.touched.hours && formik.errors.hours}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Arrival"
                    name="arrival"
                    value={formik.values.arrival}
                    onChange={formik.handleChange}
                    error={formik.touched.arrival && Boolean(formik.errors.arrival)}
                    helperText={formik.touched.arrival && formik.errors.arrival}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddBooking;
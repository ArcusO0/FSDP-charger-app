import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';;

function EditBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        email: "",
        license: "",
        hours: "",
        arrival: "",
    });

    useEffect(() => {
        http.get(`/booking/${id}`).then((res) => {
            setBooking(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: booking,
        enableReinitialize: true,
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
            data.hours = data.hours;
            data.arrival = data.arrival.trim();
            http.put(`/booking/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/bookings");
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteBooking = () => {
        http.delete(`/booking/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/bookings");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Booking
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
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen}>
                        Delete
                    </Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Booking
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this booking?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteBooking}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditBooking;
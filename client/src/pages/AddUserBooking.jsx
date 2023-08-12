import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik, useField, useFormikContext } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';


function AddUserBooking() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            vendorID:"TBA",
            bookingID:"TBA",
            customerID:"TBA",
            evcID:"TBA",
            bookingPrice:0.00,
            duration:1,
            arrivaltime:dayjs()

        },
        validationSchema: yup.object().shape({
            vendorID: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            bookingID: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            customerID: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            evcID: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            bookingPrice: yup.string().trim()
                .min(5, 'License plate must be at least 5 characters')
                .max(10, 'License plate must be at most 10 characters')
                .required('License plate is required'),
            hours: yup.number()
                .min(1, 'Must book at least 1 hour')
                .max(12, '12 hours maximum')
                .required('Hours is required')
                .integer("Must be an integer"),
            arrival: yup.string()
                .required('Time of arrival is required'),
        }),
        onSubmit: (data) => {
            data.vendorID = data.email.trim();
            data.bookingID = data.license.trim();
            data.customerID = data.license.trim();
            data.evcID = data.license.trim();
            data.bookingPrice = data.license.trim();
            data.hours = data.hours;
            data.arrival = data.arrival;
            http.post("/userbooking", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/userbookings");
                });
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Booking
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="VendorID"
                    name="vendorID"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="BookingID"
                    name="bookingID"
                    value={formik.values.license}
                    onChange={formik.handleChange}
                    error={formik.touched.license && Boolean(formik.errors.license)}
                    helperText={formik.touched.license && formik.errors.license}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="CustomerID"
                    name="customerID"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="EvcID"
                    name="evcID"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="BookingPrice"
                    name="bookingPrice"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Hours"
                    name="hours"
                    type="number"
                    value={formik.values.hours}
                    onChange={formik.handleChange}
                    error={formik.touched.hours && Boolean(formik.errors.hours)}
                    helperText={formik.touched.hours && formik.errors.hours}
                />
                <TimePicker
                    views={['hours', 'minutes']}
                    fullWidth margin="normal" autoComplete="off"
                    label="Arrival"
                    name="arrival"
                    ampm={false}
                    value={formik.values.arrival}
                    onChange={(value) => formik.setFieldValue('arrival', value.format("hh:mm"))}
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
        </LocalizationProvider>
    );
}

export default AddUserBooking;
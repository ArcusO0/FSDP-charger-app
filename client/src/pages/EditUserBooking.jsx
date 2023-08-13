import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function EditUserBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userbooking, setBooking] = useState({
        vendorID:"TBA",
        bookingID:"TBA",
        customerID:"TBA",
        evcID:"TBA",
        bookingPrice:0.00,
        duration:1,
        arrivaltime:"hh:mm"
    });

    useEffect(() => {
        http.get(`/userbooking/${id}`).then((res) => {
            setBooking(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: userbooking,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            vendorID: yup.string().trim()
                .required('License plate is required'),
            bookingID: yup.string().trim()
                .required('License plate is required'),
            customerID: yup.string().trim()
                .required('License plate is required'),
            evcID: yup.string().trim()
                .required('License plate is required'),
            bookingPrice: yup.number()
                .required('License plate is required'),
            duration: yup.number()
                .min(1, 'Must book at least 1 hour')
                .max(12, '12 hours maximum')
                .required('Hours is required')
                .integer("Must be an integer"),
            arrivaltime: yup.string()
                .required('Time of arrival is required'),
        }),
        onSubmit: (data) => {
            data.vendorID = data.vendorID.trim();
            data.bookingID = data.bookingID.trim();
            data.customerID = data.customerID.trim();
            data.evcID = data.evcID.trim();
            data.bookingPrice = data.bookingPrice
            data.duration = data.duration;
            data.arrivaltime = data.arrivaltime;
            http.put(`/userbooking/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/userbookings");
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
        http.delete(`/userbooking/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/userbookings");
            });
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Booking
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="VendorID"
                    name="vendorID"
                    value={formik.values.vendorID}
                    onChange={formik.handleChange}
                    error={formik.touched.vendorID && Boolean(formik.errors.vendorID)}
                    helperText={formik.touched.vendorID && formik.errors.vendorID}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="BookingID"
                    name="bookingID"
                    value={formik.values.bookingID}
                    onChange={formik.handleChange}
                    error={formik.touched.bookingID && Boolean(formik.errors.bookingID)}
                    helperText={formik.touched.bookingID && formik.errors.bookingID}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="CustomerID"
                    name="customerID"
                    value={formik.values.customerID}
                    onChange={formik.handleChange}
                    error={formik.touched.customerID && Boolean(formik.errors.customerID)}
                    helperText={formik.touched.customerID && formik.errors.customerID}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="EvcID"
                    name="evcID"
                    value={formik.values.evcID}
                    onChange={formik.handleChange}
                    error={formik.touched.evcID && Boolean(formik.errors.evcID)}
                    helperText={formik.touched.evcID && formik.errors.evcID}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="BookingPrice"
                    name="bookingPrice"
                    value={formik.values.bookingPrice}
                    onChange={formik.handleChange}
                    error={formik.touched.bookingPrice && Boolean(formik.errors.bookingPrice)}
                    helperText={formik.touched.bookingPrice && formik.errors.bookingPrice}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Duration"
                    name="duration"
                    type="number"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                />
                <TimePicker
                    views={['hours', 'minutes']}
                    fullWidth margin="normal" autoComplete="off"
                    label="ArrivalTime"
                    name="arrivaltime"
                    ampm={false}
                    value={formik.values.arrivaltime}
                    onChange={(value) => formik.setFieldValue('arrivaltime', value.format("hh:mm"))}
                    error={formik.touched.arrivaltime && Boolean(formik.errors.arrivaltime)}
                    helperText={formik.touched.arrivaltime && formik.errors.arrivaltime}
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
        </LocalizationProvider>
    );
}

export default EditUserBooking;
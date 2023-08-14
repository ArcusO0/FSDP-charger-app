import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik, useField, useFormikContext } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import UserNavbar from "../components/userNavbar";

function AddUserBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [feedback, setFeedback] = useState({
        title: "",
        description: ""
    });
    
    useEffect(() => {
        http.get(`/MyEVC/${id}`).then((res) => {
            setFeedback(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            vendorID:"TBA",
            bookingID:"TBA",
            customerID:"TBA",
            evcID:"TBA",
            bookingPrice:0.00,
            duration:1,
            arrivaltime:"hh:mm"

        },
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
        <UserNavbar/>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Booking
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
                    views={['hours']}
                    fullWidth margin="normal" autoComplete="off"
                    label="Hour"
                    name="arrivaltime"
                    ampm={false}
                    value={formik.values.arrivaltime}
                    onChange={(value) => formik.setFieldValue('arrivaltime', value.format("HH:mm"))}
                    error={formik.touched.arrivaltime && Boolean(formik.errors.arrivaltime)}
                    helperText={formik.touched.arrivaltime && formik.errors.arrivaltime}
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
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePassword() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get('/user/auth').then((res) => {
                setUser(res.data.user);
            });
        }
    }, []);

    useEffect(() => {
        formik.setValues({
            name: user.name,
            email: user.email,
            newPassword: '',
            confirmPassword: ''
        });
    }, [user]);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            newPassword: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            newPassword: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required'),
            confirmPassword: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Confirm Password is required')
                .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
        }),
        onSubmit: () => {
            setOpenDialog(true);
        }
    });

    const handleUpdatePassword = () => {
        if (formik.isValid) {
            setOpenDialog(true);
        } else {
            // Handle invalid form state, such as showing errors or messages
            toast.error('Please ensure both passwords match and meet requirements.');
        }
    };
    const handleConfirmUpdatePassword = () => {
        setOpenDialog(false);
        localStorage.clear();
        window.location = "/";
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Update Password
            </Typography>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* ... (existing form fields) ... */}

                {/* New Password */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    type="password"
                    name="newPassword"
                    size="small"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                />

                {/* Confirm Password */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    size="small"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="button" onClick={handleUpdatePassword}>
                        Update Password
                    </Button>
                </Box>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Password Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update your password?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmUpdatePassword} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Box>
    );
}

export default UpdatePassword;

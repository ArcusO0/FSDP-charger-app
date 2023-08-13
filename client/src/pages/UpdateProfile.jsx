import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AspectRatio from '@mui/joy/AspectRatio';


function UpdateProfile() {
    const { id } = useParams(); // Assuming your route parameter is named 'id'
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

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
            email: user.email
        });
    }, [user]);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
        }),
        onSubmit: (data) => {
            data.email = data.email.trim().toLowerCase();
            http.put(`/user/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                });
        }
    });

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    setImageFile(res.data.filename);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false); // Added deleting state

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUser = () => {
        setDeleting(true);

        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        };

        http.delete(`/user/${user.id}`, { headers }) // Use user.id instead of id
            .then((res) => {
                console.log(res.data);
                setDeleting(false);
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error deleting account:', error);
                setDeleting(false);
            });


    }
    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Update Profile
            </Typography>
            <Box                 component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                    border: '1px solid #ccc', // Adding a border
                    padding: '20px', // Adding padding
                    borderRadius: '8px', // Adding border radius
                    border: '1px solid #ccc',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={8}>
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
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box sx={{ textAlign: 'center', mt: 2 }} >
                            <Button variant="contained" component="label">
                                Profile Picture
                                <input hidden accept="image/*" multiple type="file"
                                    onChange={onFileChange} />
                            </Button>
                            {
                                imageFile && (
                                    <AspectRatio sx={{ mt: 2 }}>
                                        <Box component="img" alt="tutorial"
                                            src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}>
                                        </Box>
                                    </AspectRatio>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                    <a href="/Login#/UpdatePassword">Update Password</a>
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ ml: 2 }}
                        color="error"
                        onClick={handleOpen}
                        disabled={deleting} // Disable the button while deleting
                    >
                        {deleting ? "Deleting..." : "Delete Account"}
                    </Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete User
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteUser}
                        disabled={deleting} // Disable the button while deleting
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Box>
    );
}

export default UpdateProfile;

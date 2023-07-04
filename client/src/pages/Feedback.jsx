import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AspectRatio from '@mui/joy/AspectRatio';

function Feedback() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: yup.object().shape({
            title: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be at most 100 characters')
                .required('Title is required'),
            description: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required')
        }),
        onSubmit: (data) => {
            data.title = data.title.trim();
            data.description = data.description.trim();
            http.post("/tutorial", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/tutorials");
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Feedback
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box sx={{ textAlign: 'center', mt: 2 }} >
                            <Button variant="contained" component="label">
                                Upload Image
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
                        Add
                    </Button>
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Feedback;
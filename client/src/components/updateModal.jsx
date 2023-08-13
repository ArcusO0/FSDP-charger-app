import React, {useState} from 'react';
import {Box, Modal, IconButton, Button, Grid, TextField, InputAdornment, Typography, Container, createTheme, ThemeProvider} from "@mui/material";
import { ArrowBackIosRounded, CreateSharp } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";

function UpdateModal({req_id, req_name, req_address, req_description, req_rate}) {
    const theme = createTheme({
      typography: {
        fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
      },
      palette: {
        defButton: {
          main: "#9BB1C3",
          contrastText: "#FFFFFF"
        }
      }
    });
    const [open, setOpen] = React.useState(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const reloadPage = () => {
      window.location.reload();
    };

    const [req, setReq] = useState({
      id: req_id,
      name: req_name,
      address: req_address,
      description: req_description,
      rate: req_rate
    });

    const formik = useFormik({
      initialValues: req,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        name: yup.string().trim()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must be at most 100 characters")
            .required("Name is required"),
        description: yup.string().trim()
            .max(500, "Description must be at most 500 characters"),
        address: yup.string().trim()
            .min(3, "Address must be at least 3 characters")
            .max(500, "Address must be at most 500 characters")
            .required("Address is required"),
        rate: yup.string()
            .test('is-decimal', 
                'Invalid rate, enter a decimal value with 2 decimal places', 
                (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/))
            .required("Rate is required")
      }),
      onSubmit: (data) => {
        data.name = data.name.trim();
        data.address = data.address.trim();
        if (data.description) {
            data.description = data.description.trim();
        }
        console.log(data);
        http.put(`/MyRequests/updateRequest/${req.id}`, data)
        .then((res)=> {
          console.log(res.data);
          reloadPage();
        })
      }
    });
  
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <IconButton sx={{display: "inline-block", position: "relative", mt: -5, float:'right'}} onClick={handleOpen}>
            <CreateSharp sx={{width: 30, height: 30, color: "black"}}/>
        </IconButton> 
        <Modal
        open={open}
        onClose={handleClose}>
          <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600,
          backgroundColor:'background.paper', border: '1px solid #000', boxShadow: 24, p: 4}}>
            <Container sx={{textAlign:"center", alignItems:"center"}}>
                <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2, float:"left"}} onClick={handleClose}/>
                <Typography variant="h5" sx={{ display:"inline-block"}}>
                    Update Request
                </Typography>
            </Container>
            <Box component="form" onSubmit={formik.handleSubmit} >
              <Box sx={{display:"flex", justifyContent:"center", mt: 2}}>
                <Grid item xs={10}>
                  <TextField
                  autoComplete='off'
                  fullWidth
                  margin="normal"
                  label="Selected Request ID"
                  name="id"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  error={formik.touched.id && Boolean(formik.errors.id)}
                  helperText={formik.touched.id && formik.errors.id}
                  />

                  <TextField
                  autoComplete='off'
                  fullWidth
                  margin="normal"
                  label="EV Charger Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  />
                  
                  <TextField
                  autoComplete='off'
                  fullWidth
                  margin="normal"
                  label="EV Charger Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  />
                  
                  <TextField
                  autoComplete='off'
                  fullWidth
                  margin="normal"
                  label="EV Charger Rate"
                  name="rate"
                  value={formik.values.rate}
                  onChange={formik.handleChange}
                  error={formik.touched.rate && Boolean(formik.errors.rate)}
                  helperText={formik.touched.rate && formik.errors.rate}
                  InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  />

                  <TextField
                  autoComplete='off'
                  fullWidth
                  margin="normal"
                  multiline
                  minRows={4}
                  label="EV Charger Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
              </Box>
                
              <Box sx={{display:"flex", justifyContent: "center"}}>
                <Button variant="contained" type="submit" sx={{px:5, mt: 5, width:"80%"}} anchor="bottom" color="defButton">
                  Update
                </Button>
              </Box>
            </Box>
          </Box>            
        </Modal>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default UpdateModal
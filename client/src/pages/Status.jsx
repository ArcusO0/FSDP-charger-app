import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

function Status() {
    return(
        <Box>
            <Typography variant="h3" sx={{ my: 2 }}>
                Status
            </Typography>
            <Typography variant="h1" sx={{ my: 2 }}>
                00:00:00
            </Typography>
        </Box>  
    );  
}

export default Status;
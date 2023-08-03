import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

function UserFeedbacks() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getFeedbacks = () => {
        http.get('/feedback').then((res) => {
            setFeedbackList(res.data);
        });
    };

    const searchFeedbacks = () => {
        http.get(`/feedback?search=${search}`).then((res) => {
            setFeedbackList(res.data);
        });
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchFeedbacks();
        }
    };

    const onClickSearch = () => {
        searchFeedbacks();
    }

    const onClickClear = () => {
        setSearch('');
        getFeedbacks();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Feedbacks
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addfeedback" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    feedbackList.map((feedback, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={feedback.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {feedback.title}
                                            </Typography>
                                            <Link to={`/editfeedback/${feedback.id}`}>
                                                <IconButton color="primary" sx={{ padding: '4px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(feedback.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {feedback.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default UserFeedbacks;
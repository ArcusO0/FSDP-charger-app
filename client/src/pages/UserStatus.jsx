import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import { useCountdown } from '../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

function UserStatus() {
    const [bookingList, setBookingList] = useState([]);
    const HOURS_IN_MS = 60 * 60 * 1000;
    const MINUTES_IN_MS = 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const getBookings = () => {
      http.get('/userbooking').then((res) => {
          setBookingList(res.data);
      });
    };

    useEffect(() => {
        getBookings();
    }, []);
    const ExpiredNotice = () => {
        return (
          <div className="expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
          </div>
        );
      };
  
    const ShowCounter = ({ days, hours, minutes, seconds }) => {
      return (
        <div className="show-counter">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="countdown-link"
          >
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
          </a>
        </div>
      );
    };
  
    const CountdownTimer = ({ targetDate }) => {
      const [days, hours, minutes, seconds] = useCountdown(targetDate);
    
      if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
      } else {
        return (
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        );
      }
    };

    return (
      <Box>
        <Typography variant="h2" sx={{ my: 2 }}>
                Countdown Timer
          </Typography>
      <Grid container spacing={2}>
                {
                    bookingList.map((booking, i) => {
                        return (
                          <Grid item xs={12} md={6} lg={4} key={booking.id}>
                              <Card>
                                  <CardContent>
                                    <Typography variant="h6" sx={{ my: 2 }}>
                                        {booking.bookingID}
                                    </Typography>
                                    <CountdownTimer targetDate={NOW_IN_MS + 
                                      (((parseInt((booking.arrivaltime).substring(0,2))  + booking.duration) * HOURS_IN_MS)) - 
                                      ((dayjs().format("HH") * HOURS_IN_MS) + (dayjs().format("mm")) * MINUTES_IN_MS)} />
                                  </CardContent>
                              </Card>
                          </Grid>
                        )
                    })
                }
          </Grid>
        </Box>
      );
      
}

export default UserStatus;
{/* <CountdownTimer targetDate={NOW_IN_MS + (booking.duration * HOURS_IN_MS)  + (parseInt((booking.arrivaltime).substring(0,2)) * HOURS_IN_MS) + (parseInt((booking.arrivaltime).substring(3,2)) * MINUTES_IN_MS)} /> */}

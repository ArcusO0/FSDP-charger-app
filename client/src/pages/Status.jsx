import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import { useCountdown } from '../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

function Status() {
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
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
        <div>
          <h1>Countdown Timer</h1>
          <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        </div>
      );
}

export default Status;
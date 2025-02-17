import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography, CountdownNumbersTypography } from '../../assets/elements/CustomTypography';

// filepath: /media/philippe/C0CE77BCCE77A974/github-2/testnet-alpha-stox-dapp/src/components/countDown/CountDown.tsx
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
};

const renderTime = (dimension, time) => {
    return (
        <Box textAlign="center">
            <Typography variant="h2" sx={{ color: '#ffeb3b', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                {time}
            </Typography>
            <Typography variant="h6" sx={{ color: '#ffeb3b', fontFamily: 'Roboto, sans-serif' }}>
                {dimension}
            </Typography>
        </Box>
    );
};

const getTimeSeconds = (time) => (time % minuteSeconds).toString().padStart(2, '0');
const getTimeMinutes = (time) => Math.floor((time % hourSeconds) / minuteSeconds).toString().padStart(2, '0');
const getTimeHours = (time) => Math.floor((time % daySeconds) / hourSeconds).toString().padStart(2, '0');
const getTimeDays = (time) => Math.floor(time / daySeconds).toString().padStart(2, '0');
export default function CountDown() {
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 2629743; // 1 month in seconds

    const remainingTime = endTime - stratTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const remainingTimeInSeconds = remainingTime - elapsedTime;
    const remainingDays = getTimeDays(remainingTimeInSeconds);
    const remainingHours = getTimeHours(remainingTimeInSeconds);
    const remainingMinutes = getTimeMinutes(remainingTimeInSeconds);
    const remainingSeconds = getTimeSeconds(remainingTimeInSeconds);

    return (
        <Stack rowGap={5} alignItems={'center'} >
            <Grid container justifyContent="center" spacing={4} paddingTop="10vh">
                <HomePageAnnoucementTypography>
                    STOX PRESALES 
                </HomePageAnnoucementTypography>
                <HomePageAnnoucementTypography>
                    STARTS IN
                </HomePageAnnoucementTypography>
            </Grid>
            <Grid container justifyContent="center" >
                <CountdownNumbersTypography>
                    {`${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`}
                </CountdownNumbersTypography>
            </Grid>
        </Stack>
    );
}
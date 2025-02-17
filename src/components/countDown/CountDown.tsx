import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography, CountdownNumbersTypography } from '../../assets/elements/CustomTypography';

// filepath: /media/philippe/C0CE77BCCE77A974/github-2/testnet-alpha-stox-dapp/src/components/countDown/CountDown.tsx
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;





const getTimeSeconds = (time: number) => (time % minuteSeconds).toString().padStart(2, '0');
const getTimeMinutes = (time: number) => Math.floor((time % hourSeconds) / minuteSeconds).toString().padStart(2, '0');
const getTimeHours = (time: number) => Math.floor((time % daySeconds) / hourSeconds).toString().padStart(2, '0');
const getTimeDays = (time: number) => Math.floor(time / daySeconds).toString().padStart(2, '0');
export default function CountDown() {
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 2629743; // 1 month in seconds
    const remainingTime = endTime - stratTime;
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
            <Grid container justifyContent="center" spacing={2} direction={'column'} >
            <Grid container justifyContent="center" >
                    <img src="./transparent-white-ring-logo.svg" alt="STOX" />
                </Grid>
                <Grid container justifyContent="center" >
                    <HomePageAnnoucementTypography>
                        STOX PRESALES
                    </HomePageAnnoucementTypography>
                </Grid>
                <Grid container justifyContent="center" >
                    <HomePageAnnoucementTypography>
                        STARTS IN
                    </HomePageAnnoucementTypography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" >
                <CountdownNumbersTypography>
                    {`${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`}
                </CountdownNumbersTypography>
            </Grid>
        </Stack>
    );
}
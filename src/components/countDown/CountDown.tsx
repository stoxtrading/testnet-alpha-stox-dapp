import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography, CountdownNumbersTypography, CountdownTextTypography } from '../../assets/elements/CustomTypography';
import { SocialMediaBar } from './SocialMediaBar';
import {PoweredByBar} from './PoweredByBar';
// filepath: /media/philippe/C0CE77BCCE77A974/github-2/testnet-alpha-stox-dapp/src/components/countDown/CountDown.tsx
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;





const getTimeSeconds = (time: number) => (time % minuteSeconds).toString().padStart(2, '0');
const getTimeMinutes = (time: number) => Math.floor((time % hourSeconds) / minuteSeconds).toString().padStart(2, '0');
const getTimeHours = (time: number) => Math.floor((time % daySeconds) / hourSeconds).toString().padStart(2, '0');
const getTimeDays = (time: number) => Math.floor(time / daySeconds).toString().padStart(2, '0');
export default function CountDown() {
    const targetDate = new Date('2025-05-05T00:00:00Z').getTime(); // Target date in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const remainingTime = targetDate - now;
            setElapsedTime(remainingTime / 1000); // Convert milliseconds to seconds
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const remainingTimeInSeconds = Math.max(0, elapsedTime); // Ensure remaining time is not negative
    const remainingDays = getTimeDays(remainingTimeInSeconds);
    const remainingHours = getTimeHours(remainingTimeInSeconds);
    const remainingMinutes = getTimeMinutes(remainingTimeInSeconds);
    const remainingSeconds = Number(getTimeSeconds(remainingTimeInSeconds)).toFixed(0);

 

        return (
            <Stack rowGap={5} alignItems={'center'} paddingTop="5vh">
                <Grid container justifyContent="center" spacing={2} direction={'column'} alignItems={"center"} >

                     <Grid container justifyContent="center" display={{ xs: 'flex', sm: 'none' }}>
                        <HomePageAnnoucementTypography sx={{ fontSize: '3rem', }}>
                            STOX
                        </HomePageAnnoucementTypography>
                    </Grid> 
                    <Grid container justifyContent="center" >
                        
                    </Grid>
                    <Grid container justifyContent="center" direction={"column"}>
                        <HomePageAnnoucementTypography sx={{ fontSize: '1.9rem', }}>
                            PRESALE
                        </HomePageAnnoucementTypography>
                    </Grid>
                    <Grid container justifyContent="center" direction={"column"}>

                        <HomePageAnnoucementTypography sx={{ fontSize: '1rem', }}>
                            STARTS IN
                        </HomePageAnnoucementTypography>
                    </Grid>
                </Grid>
                <Grid container columns={12} alignItems={"center"} justifyContent={"center"} marginTop="-3.7vh" marginBottom="5vh">
                    <Grid size={{ xs: 6, sm: 3 }} container direction={"column"} padding='10px' alignItems={"center"} justifyContent={"center"}>
                        <CountdownNumbersTypography >
                            {`${remainingDays}`}
                        </CountdownNumbersTypography>
                        <CountdownTextTypography>
                            days
                        </CountdownTextTypography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }} container direction={"column"} padding='10px' alignItems={"center"} justifyContent={"center"}>
                        <CountdownNumbersTypography>
                            {`${remainingHours}`}
                        </CountdownNumbersTypography>
                        <CountdownTextTypography>
                            hrs
                        </CountdownTextTypography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }} container direction={"column"} padding='10px' alignItems={"center"} justifyContent={"center"}>
                        <CountdownNumbersTypography>
                            {`${remainingMinutes}`}
                        </CountdownNumbersTypography>
                        <CountdownTextTypography>
                            mins
                        </CountdownTextTypography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }} container direction={"column"} padding='10px' alignItems={"center"} justifyContent={"center"}>
                        <CountdownNumbersTypography>
                            {`${remainingSeconds}`}
                        </CountdownNumbersTypography>
                        <CountdownTextTypography>
                            secs
                        </CountdownTextTypography>
                    </Grid>

                </Grid>
                <SocialMediaBar/>
                <PoweredByBar/>
               
            </Stack>
            
        );
    }
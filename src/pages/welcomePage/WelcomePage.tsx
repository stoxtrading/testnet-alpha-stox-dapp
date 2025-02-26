
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { CommonPageBackground } from '../../components/surfaces/CommonPageBackground';
import CountDown from '../../components/countDown/CountDown';
import WelcomePageSubsection from '../../components/welcomePageSubsection/welcomePageSubsection';

export default function WelcomePage() {







    return (
        <Grid >
            <CommonPageBackground>
                <Box display="flex" flexDirection="column" marginTop="8vh" >
                    <CountDown />
                </Box>
            </CommonPageBackground>
            <WelcomePageSubsection />
        </Grid>
    );
}
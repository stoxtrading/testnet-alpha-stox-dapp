
import Box from '@mui/material/Box';

import {CommonPageBackground} from '../../components/surfaces/CommonPageBackground';
//import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import {BugBounty} from '../../components/rewards/bugBounty';
import {Tester} from '../../components/rewards/tester';




export default function RewardsPage() {


    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="10vh" >
                <Stack rowGap={2}>
                    <Tester/>
                    <BugBounty/>



                </Stack>
            </Box>


        </CommonPageBackground>
    );
}
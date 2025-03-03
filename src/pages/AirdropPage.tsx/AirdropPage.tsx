import Box from '@mui/material/Box';
import {SimplePageBackground} from '../../components/surfaces/CommonPageBackground';
//import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Airdrop from '../../components/airdrop/Airdrop';





export default function RewardsPage() {


    return (

        <SimplePageBackground>
            <Box display="flex" flexDirection="column" marginTop="10vh" >
                <Stack rowGap={2}>
                    <Airdrop/>
                </Stack>
            </Box>


        </SimplePageBackground>
    );
}
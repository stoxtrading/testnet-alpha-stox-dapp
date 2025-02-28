
import Box from '@mui/material/Box';

import {CommonPageBackground} from '../../components/surfaces/CommonPageBackground';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';




export default function RewardsPage() {


    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="10vh" >
                <Stack rowGap={2}>
                    <Grid container columnSpacing={2} rowSpacing={2} textAlign="center">
                        <Grid size={12}>
                        <HomePageAnnoucementTypography>
                              Rewards 
                            </HomePageAnnoucementTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                Become a Testnet tester and earn STOX tokens
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                In order to get the rewards, you need to complete the following tasks:
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                1. Go on our Discord Server and drop your ETH wallet address
                            </GenericTypography>
                        </Grid>
                    </Grid>



                </Stack>
            </Box>


        </CommonPageBackground>
    );
}
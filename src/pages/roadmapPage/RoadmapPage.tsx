
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';




export default function RoadmapPage() {


    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="5vh" >
                <Stack rowGap={2}>
                    <Grid container columnSpacing={2} rowSpacing={2} textAlign="center">
                        <Grid size={12}>
                        <HomePageAnnoucementTypography>
                              Roadmap 
                            </HomePageAnnoucementTypography>
                            <HomePageAnnoucementTypography>
                                Coming Soon...
                            </HomePageAnnoucementTypography>
                        </Grid>
                    </Grid>



                </Stack>
            </Box>


        </CommonPageBackground>
    );
}
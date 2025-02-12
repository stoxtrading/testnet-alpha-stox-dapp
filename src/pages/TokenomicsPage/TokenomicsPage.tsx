
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import UniswapPool from '../../components/uniswapPool/UniswapPool';



export default function TokenomicsPage() {







    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="5vh" >
                <Stack rowGap={2}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={12}>
                            <UniswapPool />
                        </Grid>
                    </Grid>



                </Stack>
            </Box>


        </CommonPageBackground>
    );
}
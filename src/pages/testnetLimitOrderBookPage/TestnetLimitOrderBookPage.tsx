
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';

import Chart from '../../components/chart/Chart';
import Grid from '@mui/material/Grid2';




export default function TestnetLimitOrderBookPage() {
  
   
 




    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" >
               <Grid container>
                     <Grid size ={6}>
                          <Chart />
                     </Grid>
                </Grid>
            </Box>

          
        </CommonPageBackground>
    );
}
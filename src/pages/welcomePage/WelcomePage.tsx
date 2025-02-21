
import Box from '@mui/material/Box';

import {CommonPageBackground} from '../../components/surfaces/CommonPageBackground';
import CountDown from '../../components/countDown/CountDown';

export default function WelcomePage() {
  
   
 




    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column"  marginTop="8vh">
            <CountDown/>
            </Box>

          
        </CommonPageBackground>
    );
}
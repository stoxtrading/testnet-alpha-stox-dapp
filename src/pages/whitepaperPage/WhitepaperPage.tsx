
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';
import Whitepaper from '../../components/whitepaper/Whitepaper';



export default function WhitepaperPage() {


    return (

        <CommonPageBackground>

            <Box display="flex" flexDirection="column" alignItems={"center"} >
                    <Whitepaper  />

            </Box>


        </CommonPageBackground>
    );
}
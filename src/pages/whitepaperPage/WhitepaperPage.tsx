
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';
import Stack from '@mui/material/Stack';
import { HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import Whitepaper from '../../components/whitepaper/Whitepaper';
import SingleComponentStack from '../../assets/elements/CustomStack';



export default function WhitepaperPage() {


    return (

        <CommonPageBackground>

            <Box display="flex" flexDirection="column" alignItems={"center"} >
                    <Whitepaper  />

            </Box>


        </CommonPageBackground>
    );
}
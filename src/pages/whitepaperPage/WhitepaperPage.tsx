
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { CommonPageBackground } from '../../components/surfaces/CommonPageBackground';
import Whitepaper from '../../components/whitepaper/Whitepaper';
import TradingTokens from '../../components/tradingTokens/TradingTokens';
import TestnetBox from '../../assets/elements/CustomBox';


export default function WhitepaperPage() {


    return (

        <CommonPageBackground>

            <Box display="flex" flexDirection="column" alignItems={"center"} marginTop="10vh">

                <Grid container  rowSpacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                        <TestnetBox/>
                    </Grid>
                    <Grid size={12}>
                        <TradingTokens />
                    </Grid>
                    <Grid size={12} justifyItems={"center"}>
                        <Whitepaper />
                    </Grid>
                </Grid>

            </Box>


        </CommonPageBackground>
    );
}
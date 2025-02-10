
import Box from '@mui/material/Box';

import CommonPageBackground from '../../components/surfaces/CommonPageBackground';

import Chart from '../../components/chart/Chart';
import OrderBook from '../../components/orderBook/OrderBook';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Trading from '../../components/trading/Trading';
import Withdrawals from '../../components/withdrawals/Withdrawals';
import StoxEcosystem from '../../components/stoxEcosystem/StoxEcosystem';
import RealTimePrice from '../../components/realTimePrice/RealTimePrice';
import Executions from '../../components/executions/Executions';


export default function TestnetLimitOrderBookPage() {







    return (

        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="5vh" >
                <Stack rowGap={2}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={12}>
                            <RealTimePrice />
                        </Grid>
                    </Grid>

                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>    
                            <Chart />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <OrderBook />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Trading />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Withdrawals />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <StoxEcosystem />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid size={12}>
                            <Executions />
                        </Grid>
                    </Grid>

                </Stack>
            </Box>

        </CommonPageBackground>
    );
}
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { TableTitleTypography } from '../../assets/elements/CustomTypography';


const RealTimePrice = () => {
    const [price, setPrice] = useState<number | null>(null);
    const [priceChange, setPriceChange] = useState<number | null>(null);
    const [priceChangeAbs, setPriceChangeAbs] = useState<number | null>(null);


    useEffect(() => {
        const ws = new WebSocket('wss://api.universe-bank.com/market-data/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            // Subscribe to the desired market data
            ws.send(JSON.stringify({ action: 'subscribe', instrument: 'NVDA' }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.body && data.body.NVDA_cboe && data.body.NVDA_cboe.last) {
                setPrice(data.body.NVDA_cboe.last);
                setPriceChange(data.body.NVDA_cboe['24hPercChg']);
                setPriceChangeAbs(data.body.NVDA_cboe['24hPxChg']);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);




    return (
        <Box >
            <Stack   >
                
                <Grid container columnSpacing={2} alignItems="center">
                    <Grid>
                        <img src='./nvda.png' width="40" height="40" />
                    </Grid>
                    <Grid>
                        <TableTitleTypography sx={{ fontWeight: 600 }}>
                            NVIDIA Corp.
                        </TableTitleTypography>
                    </Grid>
                    <Grid>
                        <TableTitleTypography sx={{ fontWeight: 600 }}>
                            {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
                        </TableTitleTypography>
                    </Grid>
                    <Grid>
                        <TableTitleTypography sx={{ fontWeight: 600 }}>
                            {priceChange !== null ? `${(priceChange * 100).toFixed(2)}%` : 'Loading...'}
                        </TableTitleTypography>
                    </Grid>
                    <Grid>
                        <TableTitleTypography sx={{ fontWeight: 600 }}>
                            {priceChangeAbs !== null ? `(${(priceChangeAbs).toFixed(2)})` : 'Loading...'}
                        </TableTitleTypography>
                    </Grid>

                    

                </Grid>
            </Stack>
        </Box>
    );
};

export default RealTimePrice;
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { GenericTypography, NumbersTypography, } from '../../assets/elements/CustomTypography';


const RealTimePrice = () => {
    const [price, setPrice] = useState<number>(0);
    const [priceChange, setPriceChange] = useState<number | null>(null);
    const [priceChangeAbs, setPriceChangeAbs] = useState<number | null>(null);

    const prevPriceRef = useRef<number>(10);



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
                //prevPriceRef.current = price;
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

    useEffect(() => {
		prevPriceRef.current = price;
	}, [price]);


    const getColor = () => {
        if (prevPriceRef.current === null || price === null) return 'white';
        return price > prevPriceRef.current ? '#27AE60' : price < prevPriceRef.current ? 'red' : '#27AE60';
    };

    return (
        <Box >
            <Stack   >

                <Grid container alignItems="top" justifyContent="left" >
                    <Grid size={{ xs: 1, sm: 1 }} sx={{

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src='./nvda.png' width="30" height="30" />
                    </Grid>
                    <Grid size={{ xs: 7, sm: 4 }} alignContent="center" justifyContent="center" sx={{

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <GenericTypography

                            fontSize='1rem'>
                            NVIDIA Corp.
                        </GenericTypography>
                    </Grid>
                    <Grid size={{ xs: 3, sm: 2 }} sx={{

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignnContent: 'center'
                    }} >
                        <NumbersTypography fontSize={"1.2em"} paddingTop='0.4rem' color={getColor()}>
                            {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
                        </NumbersTypography>
                    </Grid>
                    <Grid display={{ xs: 'none', sm: 'flex' }} size={{ xs: 4, sm: 4 }} paddingTop='0.4rem' sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignnContent: 'center'
                    }}
                    >
                        <NumbersTypography fontSize={"0.8em"} >
                            {priceChange !== null ? `${(priceChange * 100).toFixed(2)}%` : 'Loading...'}&nbsp;{priceChangeAbs !== null ? `(${(priceChangeAbs).toFixed(2)})/24h` : 'Loading...'}
                        </NumbersTypography>
                    </Grid>

                </Grid>
            </Stack>
        </Box>
    );
};

export default RealTimePrice;
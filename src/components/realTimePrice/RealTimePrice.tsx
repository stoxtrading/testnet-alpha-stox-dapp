import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import GetReserves from '../liquidityPoolPricing/LiquidityPoolPricing'

const RealTimePrice = () => {
    const [price, setPrice] = useState<number | null>(null);
    const [priceChange, setPriceChange] = useState<number | null>(null);
    const [priceChangeAbs, setPriceChangeAbs] = useState<number | null>(null);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);

    const [currencyReserves, setCurrencyReserves] = useState<any | null>(null);
    const [assetReserves, setAssetReserves] = useState<any | null>(null);
    const [stoxPrice, setStoxPrice] = useState<any | null>(null);
    const [previousStoxPrice, setPreviousStoxPrice] = useState<any | null>(null);

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
                setPreviousPrice(price);
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
    },[] );

    useEffect(() => {
        const interval = setInterval(() => {
            GetReserves().then((reserves) => {
                setCurrencyReserves(reserves.token0Reserve);
                setAssetReserves(reserves.token1Reserve);
                setPreviousStoxPrice(stoxPrice);
                setStoxPrice(Number(reserves.token0Reserve.reserve) / Number(reserves.token1Reserve.reserve));
            });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getColor = () => {
        if (previousPrice === null || price === null) {
            return '#1e163b'; // Default color
        }
        return price > previousPrice ? '#27AE60' : '#E74C3C';
    };

    const getStoxColor = () => {
        if (previousStoxPrice === null || stoxPrice === null) {
            return '#1e163b'; // Default color
        }
        return stoxPrice >= previousStoxPrice ? '#27AE60' : '#E74C3C';
    }
    const formatNumber = (number: number, digits: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        }).format(number);
    };

    return (
        <Box >
            <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2}}  >
            <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                    <Grid>
                        <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">Live Data</Typography>
                    </Grid>
                </Grid>
                <Grid container columnSpacing={2} alignItems="center">
                    <Grid>
                        <img src='./nvda.png' width="40" height="40" />
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                            NVIDIA Corp.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" sx={{ color: getColor(), fontWeight: 600 }}>
                            {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="button" sx={{ color: getColor(), fontWeight: 600 }}>
                            {priceChange !== null ? `${(priceChange * 100).toFixed(2)}%` : 'Loading...'}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="button" sx={{ color: getColor(), fontWeight: 600 }}>
                            {priceChangeAbs !== null ? `(${(priceChangeAbs).toFixed(2)})` : 'Loading...'}
                        </Typography>
                    </Grid>

                   {/*  <Grid container offset='auto' sx={{ marginRight: 2 }} alignItems={'center'}>
                        <img src='./stox_logo.png' width="40" height="40" />
                        <Typography variant="subtitle1" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                            STOX
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: getStoxColor(), fontWeight: 600 }}>
                            {stoxPrice !== null ? `$${(stoxPrice).toExponential(8)}` : 'Loading...'}
                        </Typography>
                        <Typography variant="button" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                            Reserves:
                        </Typography>
                        <Typography variant="button" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                            {assetReserves !== null ? `${(assetReserves.symbol)} ${formatNumber(Number(assetReserves.reserve), 2)}` : 'Loading...'}
                        </Typography>
                        <Typography variant="button" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                            {currencyReserves !== null ? `${(currencyReserves.symbol)} ${formatNumber(Number(currencyReserves.reserve), 6)}` : 'Loading...'}
                        </Typography>

                    </Grid> */}

                </Grid>
            </Stack>
        </Box>
    );
};

export default RealTimePrice;
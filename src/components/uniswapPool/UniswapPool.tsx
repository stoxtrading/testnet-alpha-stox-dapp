import Grid from '@mui/material/Grid2';
import { Typography, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing';

import { Button, Link } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { mockUsdtContractConfig } from '../../assets/contracts/dev/MockUsdt';

export default function UniswapPool() {

    interface TokenInfo {
        address: string;
        symbol: string;
        reserve: string;
    }

    const [currencyReserves, setCurrencyReserves] = useState<TokenInfo>();
    const [assetReserves, setAssetReserves] = useState<TokenInfo>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPoolReserves = async () => {
            try {
                const reserves = await getPoolReserves(`${import.meta.env.VITE_APP_POOL_ADDRESS}`);
                setCurrencyReserves(reserves.token0);
                setAssetReserves(reserves.token1);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchPoolReserves();
    }, []);

    const formatNumber = (number: number, digits: number) => {
        try {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: digits,
                maximumFractionDigits: digits,
            }).format(number);
        }
        catch (e) {
            console.error(e)
            return number
        }


    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (

        <Box>
            <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2 }} >

                <Box >
                    <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2 }} >
                        <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                            <Grid container columnGap={1}>
                                <Grid>
                                    <Typography sx={{ fontWeight: 700 }} color='red' variant="overline">TESTNET</Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">Contracts</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} alignItems="center">
                            <Grid container size={9}>
                                <Grid container size={4}>
                                    <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${import.meta.env.VITE_APP_POOL_ADDRESS}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                        <Stack>
                                            <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                                UniswapV3Pool:
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#3f51b5',
                                                    textDecoration: 'underline',
                                                },
                                            }}>{import.meta.env.VITE_APP_POOL_ADDRESS}</Typography>
                                        </Stack>
                                    </Link>
                                </Grid>

                                <Grid container size={4}>
                                    <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${mockUsdtContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                        <Stack>
                                            <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                                MOCK USDT Token:
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#3f51b5',
                                                    textDecoration: 'underline',
                                                },
                                            }}>{mockUsdtContractConfig.address}</Typography>
                                        </Stack>
                                    </Link>
                                </Grid>
                                <Grid container size={4}>
                                    <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                        <Stack>
                                            <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                                STOX Token:
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#3f51b5',
                                                    textDecoration: 'underline',
                                                },
                                            }}>{stoxContractConfig.address}</Typography>
                                        </Stack>
                                    </Link>
                                </Grid>
                            </Grid>

                            <Grid container offset='auto' sx={{ marginRight: 2 }} justifyItems={'center'}>
                                <Stack justifyContent={'center'} alignContent={'center'} alignItems={'center'} direction={'column'}>

                                    <Typography variant="caption" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                                        GET TESTNET TOKENS ON DISCORD
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<DiscordIcon />}
                                        sx={{
                                            marginLeft: 2,
                                            backgroundColor: '#7289da',
                                            '&:hover': {
                                                backgroundColor: '#5e6bae',
                                            },
                                            textTransform: 'none',
                                        }}
                                        component="a"
                                        href="https://discordapp.com/channels/1328711049347862548/1339175575037673582"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Discord Channel
                                    </Button>
                                </Stack>
                            </Grid>

                        </Grid>
                        <Grid container sx={{ marginLeft: -1 }}>
                            <Grid container columnGap={1}>
                                <Grid>
                                    <Typography sx={{ fontWeight: 700 }} color='red' variant="overline">TESTNET</Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">V3 POOL</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid >
                            <Grid container >
                                <Grid size={4}>
                                    <Typography variant="body2" color='#1e163b'> {currencyReserves?.symbol || 'loading'}</Typography>
                                </Grid>
                                <Grid size={4}>
                                    <Typography variant="body2" color='#1e163b'>{assetReserves?.symbol || 'loading'}</Typography>
                                </Grid>
                                <Grid size={4}>
                                    <Typography variant="body2" color='#1e163b'>PRICE (RESERVES RATIO)</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid size={4}>
                                    <Typography
                                        color='#1e163b'
                                        variant="body2"
                                        sx={{ fontWeight: 700 }}>
                                        {formatNumber(Number(currencyReserves?.reserve) || 0, 2)}
                                    </Typography>
                                </Grid>

                                <Grid size={4}>
                                    <Typography
                                        color='#1e163b'
                                        variant="body2"
                                        sx={{ fontWeight: 700 }}>
                                        {formatNumber(Number(assetReserves?.reserve) || 0, 2)}
                                    </Typography>
                                </Grid>
                                <Grid size={4}>
                                    <Typography
                                        color='#1e163b'
                                        variant="body2"
                                        sx={{ fontWeight: 700 }}>
                                        {formatNumber(Number(currencyReserves?.reserve) / Number(assetReserves?.reserve), 2)} {currencyReserves?.symbol}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop="10vh">
                                <Grid size={4} >
                                    <Box>
                                        <img height="60%" width="60%" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDI5MCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPjxkZWZzPjxmaWx0ZXIgaWQ9ImYxIj48ZmVJbWFnZSByZXN1bHQ9InAwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMG5Namt3SnlCb1pXbG5hSFE5SnpVd01DY2dkbWxsZDBKdmVEMG5NQ0F3SURJNU1DQTFNREFuSUhodGJHNXpQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeWMrUEhKbFkzUWdkMmxrZEdnOUp6STVNSEI0SnlCb1pXbG5hSFE5SnpVd01IQjRKeUJtYVd4c1BTY2paakkzWVRrd0p5OCtQQzl6ZG1jKyIvPjxmZUltYWdlIHJlc3VsdD0icDEiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwbk1qa3dKeUJvWldsbmFIUTlKelV3TUNjZ2RtbGxkMEp2ZUQwbk1DQXdJREk1TUNBMU1EQW5JSGh0Ykc1elBTZG9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5YytQR05wY21Oc1pTQmplRDBuTVRjeEp5QmplVDBuTkRJNUp5QnlQU2N4TWpCd2VDY2dabWxzYkQwbkkyVTFZMlpqT1NjdlBqd3ZjM1puUGc9PSIvPjxmZUltYWdlIHJlc3VsdD0icDIiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwbk1qa3dKeUJvWldsbmFIUTlKelV3TUNjZ2RtbGxkMEp2ZUQwbk1DQXdJREk1TUNBMU1EQW5JSGh0Ykc1elBTZG9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5YytQR05wY21Oc1pTQmplRDBuTmpNbklHTjVQU2N4TmpZbklISTlKekV5TUhCNEp5Qm1hV3hzUFNjallUZGtPR1kzSnk4K1BDOXpkbWMrIiAvPjxmZUltYWdlIHJlc3VsdD0icDMiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwbk1qa3dKeUJvWldsbmFIUTlKelV3TUNjZ2RtbGxkMEp2ZUQwbk1DQXdJREk1TUNBMU1EQW5JSGh0Ykc1elBTZG9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5YytQR05wY21Oc1pTQmplRDBuTVRFNEp5QmplVDBuTWpnNUp5QnlQU2N4TURCd2VDY2dabWxzYkQwbkl6TTVZbVk0T1NjdlBqd3ZjM1puUGc9PSIgLz48ZmVCbGVuZCBtb2RlPSJvdmVybGF5IiBpbj0icDAiIGluMj0icDEiIC8+PGZlQmxlbmQgbW9kZT0iZXhjbHVzaW9uIiBpbjI9InAyIiAvPjxmZUJsZW5kIG1vZGU9Im92ZXJsYXkiIGluMj0icDMiIHJlc3VsdD0iYmxlbmRPdXQiIC8+PGZlR2F1c3NpYW5CbHVyIGluPSJibGVuZE91dCIgc3RkRGV2aWF0aW9uPSI0MiIgLz48L2ZpbHRlcj4gPGNsaXBQYXRoIGlkPSJjb3JuZXJzIj48cmVjdCB3aWR0aD0iMjkwIiBoZWlnaHQ9IjUwMCIgcng9IjQyIiByeT0iNDIiIC8+PC9jbGlwUGF0aD48cGF0aCBpZD0idGV4dC1wYXRoLWEiIGQ9Ik00MCAxMiBIMjUwIEEyOCAyOCAwIDAgMSAyNzggNDAgVjQ2MCBBMjggMjggMCAwIDEgMjUwIDQ4OCBINDAgQTI4IDI4IDAgMCAxIDEyIDQ2MCBWNDAgQTI4IDI4IDAgMCAxIDQwIDEyIHoiIC8+PHBhdGggaWQ9Im1pbmltYXAiIGQ9Ik0yMzQgNDQ0QzIzNCA0NTcuOTQ5IDI0Mi4yMSA0NjMgMjUzIDQ2MyIgLz48ZmlsdGVyIGlkPSJ0b3AtcmVnaW9uLWJsdXIiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIyNCIgLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQtdXAiIHgxPSIxIiB4Mj0iMCIgeTE9IjEiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAuMCIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMSIgLz48c3RvcCBvZmZzZXQ9Ii45IiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkLWRvd24iIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAuMCIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMSIgLz48c3RvcCBvZmZzZXQ9IjAuOSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIgLz48L2xpbmVhckdyYWRpZW50PjxtYXNrIGlkPSJmYWRlLXVwIiBtYXNrQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVwKSIgLz48L21hc2s+PG1hc2sgaWQ9ImZhZGUtZG93biIgbWFza0NvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC1kb3duKSIgLz48L21hc2s+PG1hc2sgaWQ9Im5vbmUiIG1hc2tDb250ZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIgLz48L21hc2s+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXN5bWJvbCI+PHN0b3Agb2Zmc2V0PSIwLjciIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjEiIC8+PHN0b3Agb2Zmc2V0PSIuOTUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiIC8+PC9saW5lYXJHcmFkaWVudD48bWFzayBpZD0iZmFkZS1zeW1ib2wiIG1hc2tDb250ZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMjkwcHgiIGhlaWdodD0iMjAwcHgiIGZpbGw9InVybCgjZ3JhZC1zeW1ib2wpIiAvPjwvbWFzaz48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2Nvcm5lcnMpIj48cmVjdCBmaWxsPSJmMjdhOTAiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjkwcHgiIGhlaWdodD0iNTAwcHgiIC8+PHJlY3Qgc3R5bGU9ImZpbHRlcjogdXJsKCNmMSkiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjkwcHgiIGhlaWdodD0iNTAwcHgiIC8+IDxnIHN0eWxlPSJmaWx0ZXI6dXJsKCN0b3AtcmVnaW9uLWJsdXIpOyB0cmFuc2Zvcm06c2NhbGUoMS41KTsgdHJhbnNmb3JtLW9yaWdpbjpjZW50ZXIgdG9wOyI+PHJlY3QgZmlsbD0ibm9uZSIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOTBweCIgaGVpZ2h0PSI1MDBweCIgLz48ZWxsaXBzZSBjeD0iNTAlIiBjeT0iMHB4IiByeD0iMTgwcHgiIHJ5PSIxMjBweCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC44NSIgLz48L2c+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI5MCIgaGVpZ2h0PSI1MDAiIHJ4PSI0MiIgcnk9IjQyIiBmaWxsPSJyZ2JhKDAsMCwwLDApIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgLz48L2c+PHRleHQgdGV4dC1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiPjx0ZXh0UGF0aCBzdGFydE9mZnNldD0iLTEwMCUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjEwcHgiIHhsaW5rOmhyZWY9IiN0ZXh0LXBhdGgtYSI+MHhlNWNmYzlhMDMyNDhlYzEzYWUxMzc4OGI2NmI3NDg5ZDUzMzliZjg5IOKAoiBNT0NLVVNEVCA8YW5pbWF0ZSBhZGRpdGl2ZT0ic3VtIiBhdHRyaWJ1dGVOYW1lPSJzdGFydE9mZnNldCIgZnJvbT0iMCUiIHRvPSIxMDAlIiBiZWdpbj0iMHMiIGR1cj0iMzBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz48L3RleHRQYXRoPiA8dGV4dFBhdGggc3RhcnRPZmZzZXQ9IjAlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiB4bGluazpocmVmPSIjdGV4dC1wYXRoLWEiPjB4ZTVjZmM5YTAzMjQ4ZWMxM2FlMTM3ODhiNjZiNzQ4OWQ1MzM5YmY4OSDigKIgTU9DS1VTRFQgPGFuaW1hdGUgYWRkaXRpdmU9InN1bSIgYXR0cmlidXRlTmFtZT0ic3RhcnRPZmZzZXQiIGZyb209IjAlIiB0bz0iMTAwJSIgYmVnaW49IjBzIiBkdXI9IjMwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+IDwvdGV4dFBhdGg+PHRleHRQYXRoIHN0YXJ0T2Zmc2V0PSI1MCUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjEwcHgiIHhsaW5rOmhyZWY9IiN0ZXh0LXBhdGgtYSI+MHhmMjdhOTAyNGNmMjUyZDMxNzA1Y2VmMTVhNjU4MWYyZTBhYTdkOGY3IOKAoiBTVE9YIDxhbmltYXRlIGFkZGl0aXZlPSJzdW0iIGF0dHJpYnV0ZU5hbWU9InN0YXJ0T2Zmc2V0IiBmcm9tPSIwJSIgdG89IjEwMCUiIGJlZ2luPSIwcyIgZHVyPSIzMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPjwvdGV4dFBhdGg+PHRleHRQYXRoIHN0YXJ0T2Zmc2V0PSItNTAlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiB4bGluazpocmVmPSIjdGV4dC1wYXRoLWEiPjB4ZjI3YTkwMjRjZjI1MmQzMTcwNWNlZjE1YTY1ODFmMmUwYWE3ZDhmNyDigKIgU1RPWCA8YW5pbWF0ZSBhZGRpdGl2ZT0ic3VtIiBhdHRyaWJ1dGVOYW1lPSJzdGFydE9mZnNldCIgZnJvbT0iMCUiIHRvPSIxMDAlIiBiZWdpbj0iMHMiIGR1cj0iMzBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz48L3RleHRQYXRoPjwvdGV4dD48ZyBtYXNrPSJ1cmwoI2ZhZGUtc3ltYm9sKSI+PHJlY3QgZmlsbD0ibm9uZSIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOTBweCIgaGVpZ2h0PSIyMDBweCIgLz4gPHRleHQgeT0iNzBweCIgeD0iMzJweCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtd2VpZ2h0PSIyMDAiIGZvbnQtc2l6ZT0iMzZweCI+U1RPWC9NT0NLVVNEVDwvdGV4dD48dGV4dCB5PSIxMTVweCIgeD0iMzJweCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtd2VpZ2h0PSIyMDAiIGZvbnQtc2l6ZT0iMzZweCI+MC4wNSU8L3RleHQ+PC9nPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjI1OCIgaGVpZ2h0PSI0NjgiIHJ4PSIyNiIgcnk9IjI2IiBmaWxsPSJyZ2JhKDAsMCwwLDApIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgLz48ZyBtYXNrPSJ1cmwoI25vbmUpIiBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSg3MnB4LDE4OXB4KSI+PHJlY3QgeD0iLTE2cHgiIHk9Ii0xNnB4IiB3aWR0aD0iMTgwcHgiIGhlaWdodD0iMTgwcHgiIGZpbGw9Im5vbmUiIC8+PHBhdGggZD0iTTEgMUMzMyA1NyA4OSAxMTMgMTQ1IDE0NSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMykiIHN0cm9rZS13aWR0aD0iMzJweCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPjwvZz48ZyBtYXNrPSJ1cmwoI25vbmUpIiBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSg3MnB4LDE4OXB4KSI+PHJlY3QgeD0iLTE2cHgiIHk9Ii0xNnB4IiB3aWR0aD0iMTgwcHgiIGhlaWdodD0iMTgwcHgiIGZpbGw9Im5vbmUiIC8+PHBhdGggZD0iTTEgMUMzMyA1NyA4OSAxMTMgMTQ1IDE0NSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDEpIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+PC9nPjxjaXJjbGUgY3g9IjczcHgiIGN5PSIxOTBweCIgcj0iNHB4IiBmaWxsPSJ3aGl0ZSIgLz48Y2lyY2xlIGN4PSIyMTdweCIgY3k9IjMzNHB4IiByPSI0cHgiIGZpbGw9IndoaXRlIiAvPiA8ZyBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSgyOXB4LCAzODRweCkiPjxyZWN0IHdpZHRoPSI5MXB4IiBoZWlnaHQ9IjI2cHgiIHJ4PSI4cHgiIHJ5PSI4cHgiIGZpbGw9InJnYmEoMCwwLDAsMC42KSIgLz48dGV4dCB4PSIxMnB4IiB5PSIxN3B4IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjEycHgiIGZpbGw9IndoaXRlIj48dHNwYW4gZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIj5JRDogPC90c3Bhbj4xMjMwMjwvdGV4dD48L2c+IDxnIHN0eWxlPSJ0cmFuc2Zvcm06dHJhbnNsYXRlKDI5cHgsIDQxNHB4KSI+PHJlY3Qgd2lkdGg9IjE0MHB4IiBoZWlnaHQ9IjI2cHgiIHJ4PSI4cHgiIHJ5PSI4cHgiIGZpbGw9InJnYmEoMCwwLDAsMC42KSIgLz48dGV4dCB4PSIxMnB4IiB5PSIxN3B4IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjEycHgiIGZpbGw9IndoaXRlIj48dHNwYW4gZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIj5NaW4gVGljazogPC90c3Bhbj4yOTkzMDA8L3RleHQ+PC9nPiA8ZyBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSgyOXB4LCA0NDRweCkiPjxyZWN0IHdpZHRoPSIxNDBweCIgaGVpZ2h0PSIyNnB4IiByeD0iOHB4IiByeT0iOHB4IiBmaWxsPSJyZ2JhKDAsMCwwLDAuNikiIC8+PHRleHQgeD0iMTJweCIgeT0iMTdweCIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMnB4IiBmaWxsPSJ3aGl0ZSI+PHRzcGFuIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSI+TWF4IFRpY2s6IDwvdHNwYW4+Mjk5NDAwPC90ZXh0PjwvZz48ZyBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSgyMjZweCwgNDMzcHgpIj48cmVjdCB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzNnB4IiByeD0iOHB4IiByeT0iOHB4IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik04IDlDOC4wMDAwNCAyMi45NDk0IDE2LjIwOTkgMjggMjcgMjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIC8+PGNpcmNsZSBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDI0cHgsIDI3cHgsIDBweCkiIGN4PSIwcHgiIGN5PSIwcHgiIHI9IjRweCIgZmlsbD0id2hpdGUiLz48L2c+PC9zdmc+"></img>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Stack>
                </Box>

            </Stack>
        </Box>

    )

}
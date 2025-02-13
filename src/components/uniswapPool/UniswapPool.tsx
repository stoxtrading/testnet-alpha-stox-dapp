import Grid from '@mui/material/Grid2';
import { Typography, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing';
import LiquidityCreation from './LiquidityCreation';
/*import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia'; */
import { Button, Link } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
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
    const [fee, setFee] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPoolReserves = async () => {
            try {
                const reserves = await getPoolReserves(`${import.meta.env.VITE_APP_POOL_ADDRESS}`);
                setCurrencyReserves(reserves.token0);
                setAssetReserves(reserves.token1);
                setFee(reserves.fee);
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
            <Stack rowGap={2} >


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
                </Stack>
                <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2 }} >
                    <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
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
                            <Grid size={3}>
                                <Typography variant="body2" color='#1e163b'> {currencyReserves?.symbol || 'loading'} LIQUIDITY</Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="body2" color='#1e163b'>{assetReserves?.symbol || 'loading'} LIQUIDITY</Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="body2" color='#1e163b'>  FEE</Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="body2" color='#1e163b'>PRICE (LIQUIDITIES RATIO)</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid size={3}>
                                <Typography
                                    color='#1e163b'
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}>
                                    {formatNumber(Number(currencyReserves?.reserve) || 0, 2)}
                                </Typography>
                            </Grid>

                            <Grid size={3}>
                                <Typography
                                    color='#1e163b'
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}>
                                    {formatNumber(Number(assetReserves?.reserve) || 0, 2)}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography
                                    color='#1e163b'
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}>
                                    {formatNumber(Number(fee) || 0, 2)}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography
                                    color='#1e163b'
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}>
                                    1 {assetReserves?.symbol || 'loading'} = {formatNumber(Number(currencyReserves?.reserve) / Number(assetReserves?.reserve), 2)} {currencyReserves?.symbol}
                                </Typography>
                            </Grid>
                        </Grid>
                         <Grid container marginTop="4vh" justifyContent={"center"}>
                
                            <Grid container size={6} justifyContent={"center"} >
                                <Grid container justifyContent={"center"} size={12}>
                                    <Typography >MINT LIQUIDITY</Typography>
                                </Grid>
                                <Grid container justifyContent={"center"} size={12}>
                                    <LiquidityCreation />
                                </Grid>
                            </Grid>
                            <Grid container size={6} justifyContent={"center"} >
                                <Grid container justifyContent={"center"} size={12}>
                                </Grid>
                                <Grid container justifyContent={"center"} size={12}>
                                </Grid>
                            </Grid>
                        </Grid> *
                    </Grid>
                </Stack>

            </Stack>
        </Box>

    )

}
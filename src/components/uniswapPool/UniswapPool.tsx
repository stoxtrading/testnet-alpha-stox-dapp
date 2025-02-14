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
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { TableTitleTypography } from '../../assets/elements/CustomTypography';
import { ClickableTxHashTypography, SubtitleTypography } from '../../assets/elements/CustomTypography';


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


                <SingleComponentStack >
                <StackTitle title='Contracts' />
                    <Grid container columnSpacing={2} alignItems="center">
                        <Grid container size={9}>
                            <Grid container size={4}>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${import.meta.env.VITE_APP_POOL_ADDRESS}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <Stack>
                                        <SubtitleTypography>
                                            Uniswap V3 Pool
                                        </SubtitleTypography>
                                        <ClickableTxHashTypography>{import.meta.env.VITE_APP_POOL_ADDRESS}</ClickableTxHashTypography>
                                    </Stack>
                                </Link>
                            </Grid>

                            <Grid container size={4}>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${mockUsdtContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <Stack>
                                        <SubtitleTypography>
                                            MOCK USDT Token
                                        </SubtitleTypography>
                                        <ClickableTxHashTypography>{mockUsdtContractConfig.address}</ClickableTxHashTypography>
                                    </Stack>
                                </Link>
                            </Grid>
                            <Grid container size={4}>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <Stack>
                                        <SubtitleTypography>
                                            STOX Token
                                        </SubtitleTypography>
                                        <ClickableTxHashTypography>{stoxContractConfig.address}</ClickableTxHashTypography>
                                    </Stack>
                                </Link>
                            </Grid>
                        </Grid>

                        <Grid container offset='auto'  justifyItems={'center'} size={3}>

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
                                <SubtitleTypography sx={{ fontWeight: 600, color: 'white' }}>
                                    GET TESTNET TOKENS
                                </SubtitleTypography>
                            </Button>
                        </Grid>

                    </Grid>
                </SingleComponentStack>
                <SingleComponentStack >
                <StackTitle title='V3 Pool' />
                    <Grid >
                        <Grid container >
                            <Grid size={3}>
                                <TableTitleTypography> {currencyReserves?.symbol || 'loading'} LIQUIDITY</TableTitleTypography>
                            </Grid>
                            <Grid size={3}>
                                <TableTitleTypography>{assetReserves?.symbol || 'loading'} LIQUIDITY</TableTitleTypography>
                            </Grid>
                            <Grid size={3}>
                                <TableTitleTypography>  FEE</TableTitleTypography>
                            </Grid>
                            <Grid size={3}>
                                <TableTitleTypography>PRICE (LIQUIDITIES RATIO)</TableTitleTypography>
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
                                    <TableTitleTypography >MINT LIQUIDITY</TableTitleTypography>
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
                        </Grid>
                    </Grid>
                </SingleComponentStack>

            </Stack>
        </Box>

    )

}
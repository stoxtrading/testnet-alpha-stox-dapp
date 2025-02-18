import Grid from '@mui/material/Grid2';
import { CircularProgress, Fade,  Stack } from '@mui/material';

import { useEffect, useState } from 'react';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing';
/*import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia'; */
import { Button, Link } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { mockUsdtContractConfig } from '../../assets/contracts/dev/MockUsdt';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { TableTitleTypography } from '../../assets/elements/CustomTypography';
import { ClickableTxHashTypography, SubtitleTypography, NumbersTypography, } from '../../assets/elements/CustomTypography';


export default function UniswapPool() {

    const [dataLoading, setDataLoading] = useState(false);

    const handleBackDropOpen = () => {
        setDataLoading(true);
    };

    const handleBackDropClose = () => {
        setDataLoading(false);
    };

    interface TokenInfo {
        address: string;
        symbol: string;
        reserve: string;
    }

    const [currencyReserves, setCurrencyReserves] = useState<TokenInfo>();
    const [assetReserves, setAssetReserves] = useState<TokenInfo>();
    const [fee, setFee] = useState<number>(0);

    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPoolReserves = async () => {
            try {
                handleBackDropOpen();
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
                handleBackDropClose();
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


    if (error) return <div color="white">Error: {error}</div>;
    return (


        <Stack rowGap={2} >


            <SingleComponentStack >

                <Grid container>
                    <StackTitle
                        title='Contracts' />
                    <Grid offset='auto' sx={{ marginTop: -1.25 }}>
                        <Fade in={dataLoading}>
                            <CircularProgress color="secondary" size="15px" />
                        </Fade>
                    </Grid>
                </Grid>

                <Grid container rowGap={2}>
                    <Grid container direction="column" size={{ sm: 12, md: 3 }}>
                        <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${import.meta.env.VITE_APP_POOL_ADDRESS}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                            <Grid container direction="column" rowGap={1}>
                                <SubtitleTypography>
                                    UNISWAP V3 POOL
                                </SubtitleTypography>
                                <ClickableTxHashTypography>{import.meta.env.VITE_APP_POOL_ADDRESS}</ClickableTxHashTypography>
                            </Grid>
                        </Link>
                    </Grid>

                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${mockUsdtContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                            <Grid container direction="column" rowGap={1}>
                                <SubtitleTypography>
                                    MOCK USDT TOKEN
                                </SubtitleTypography>
                                <ClickableTxHashTypography>{mockUsdtContractConfig.address}</ClickableTxHashTypography>
                            </Grid>
                        </Link>
                    </Grid>
                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                            <Grid container direction="column" rowGap={1}>
                                <SubtitleTypography>
                                    STOX TOKEN
                                </SubtitleTypography>
                                <ClickableTxHashTypography>{stoxContractConfig.address}</ClickableTxHashTypography>
                            </Grid>
                        </Link>
                    </Grid>
                    <Grid container justifyItems={'center'} size={{ sm: 12, md: 3 }}>

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
            <Grid container>
                    <StackTitle
                        title='V3 POOL' />
                    <Grid offset='auto' sx={{ marginTop: -1.25 }}>
                        <Fade in={dataLoading}>
                            <CircularProgress color="secondary" size="15px" />
                        </Fade>
                    </Grid>
                </Grid>

                <Grid container rowGap={2}>
                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <SubtitleTypography> {currencyReserves?.symbol || 'loading'} </SubtitleTypography>
                        <NumbersTypography sx={{ fontWeight: 700 }}>
                            {formatNumber(Number(currencyReserves?.reserve) || 0, 2)}
                        </NumbersTypography>
                    </Grid>
                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <SubtitleTypography>{assetReserves?.symbol || 'loading'} </SubtitleTypography>
                        <NumbersTypography
                            sx={{ fontWeight: 700 }}>
                            {formatNumber(Number(assetReserves?.reserve) || 0, 2)}
                        </NumbersTypography>
                    </Grid>
                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <SubtitleTypography>  FEE</SubtitleTypography>
                        <NumbersTypography
                            sx={{ fontWeight: 700 }}>
                            {formatNumber(Number(fee) || 0, 2)}
                        </NumbersTypography>
                    </Grid>
                    <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                        <SubtitleTypography>PRICE (LIQUIDITY RATIO)</SubtitleTypography>
                        <NumbersTypography
                            sx={{ fontWeight: 700 }}>
                            1 {assetReserves?.symbol || 'loading'} = {formatNumber(Number(currencyReserves?.reserve) / Number(assetReserves?.reserve), 2)} {currencyReserves?.symbol}
                        </NumbersTypography>
                    </Grid>
                </Grid>
            </SingleComponentStack>
            <SingleComponentStack>
                <StackTitle title='LIQUIDITY MINTING' />
                <Grid container marginTop="4vh" justifyContent={"center"}>

                    <Grid container size={6} justifyContent={"left"} >
                        <Grid container justifyContent={"left"} size={12}>
                            <TableTitleTypography >COMING SOON...</TableTitleTypography>
                        </Grid>
                        <Grid container justifyContent={"center"} size={12}>

                            {/* <LiquidityCreation /> */}
                        </Grid>
                    </Grid>
                    <Grid container size={6} justifyContent={"center"} >
                        <Grid container justifyContent={"center"} size={12}>
                        </Grid>
                        <Grid container justifyContent={"center"} size={12}>
                        </Grid>
                    </Grid>
                </Grid>

            </SingleComponentStack>


        </Stack>


    )

}
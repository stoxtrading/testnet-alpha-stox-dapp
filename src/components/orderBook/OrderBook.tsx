import React, { JSX, useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { useAccount } from 'wagmi'
import { CancelIcon } from "../../assets/icons/CancelIcon";
import {

    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'
import './OrderBook.css'
import { CircularProgress, Fade,  Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing'
import SingleComponentStack from '../../assets/elements/CustomStack';
import { ClickableAddressTypography, TableTitleTypography, NumbersTypography } from '../../assets/elements/CustomTypography';
import StackTitle from '../buildingBlocks/StackTitle';
import {GridAsksHeader, GridAsksAddr, GridAsksNb, GridAction, GridBidsNb, GridBidsAddr} from '../../assets/elements/CustomGrid';



const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function OrderBook(): JSX.Element {


    const [dataLoading, setDataLoading] = useState(false);

    interface Order {
        address: string;
        price: bigint;
        quantity: bigint;
    }

    const [sortedSellSideOrderBook, setSortedSellSideOrderBook] = useState<Order[]>([]);
    const [sortedBuySideOrderBook, setSortedBuySideOrderBook] = useState<Order[]>([]);

    const { address: connectedWalletAddress } = useAccount()

    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');



    interface TokenInfo {
        address: string;
        symbol: string;
        reserve: string;
    }

    const [assetReserves, setAssetReserves] = useState<TokenInfo>();
    const [stoxPrice, setStoxPrice] = useState<number>(0);


    const [poolError, setPoolError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPoolReserves = async () => {
            try {
                setDataLoading(true)
                const reserves = await getPoolReserves("0xDA7FeB22c7701c4DFc05bF34F27AfD122dcd49e2");
                setAssetReserves(reserves.token1);
                setStoxPrice(Number(reserves.token0.reserve) / Number(reserves.token1.reserve));
                console.log("reserves Price", reserves)
                console.log("STOX PRICE", Number(reserves.token0.reserve) / Number(reserves.token1.reserve))
            } catch (err) {
                if (err instanceof Error) {
                    setPoolError(err.message);
                } else {
                    setPoolError(String(err));
                }
            }  finally {
                setDataLoading(false)
            } 
        };

        fetchPoolReserves();
    }, []);




    const handleSnackBarOpen = (message: string) => {
        setMessage(message);
        setSnackBarOpen(true);
    };

    const handleSnackBarClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };

    const { data: sellSideOrderBook } = useReadContract({
        ...nvidiaOrderBookContractConfig,
        functionName: 'getSellSide',
        args: [],
        query: { refetchInterval: 1000, refetchIntervalInBackground: true }

    })
    const { data: buySideOrderBook } = useReadContract({
        ...nvidiaOrderBookContractConfig,
        functionName: 'getBuySide',
        args: [], query: { refetchInterval: 1000, refetchIntervalInBackground: true }
    })
    console.log(sellSideOrderBook)
    useEffect(() => {

        // Sort sellSideOrderBook by price from higher to lower
        const sortedSellSideOrderBook = sellSideOrderBook ? sellSideOrderBook[0].map((address, index) => ({
            address,
            price: sellSideOrderBook[1][index],
            quantity: sellSideOrderBook[2][index],
        })).sort((a, b) => Number(b.price) - Number(a.price)) : [];
        setSortedSellSideOrderBook(sortedSellSideOrderBook);

        // Sort buySideOrderBook by price from higher to lower
        const sortedBuySideOrderBook = buySideOrderBook ? buySideOrderBook[0].map((address, index) => ({
            address,
            price: buySideOrderBook[1][index],
            quantity: buySideOrderBook[2][index],
        })).sort((a, b) => Number(b.price) - Number(a.price)) : [];
        setSortedBuySideOrderBook(sortedBuySideOrderBook);
    }, [sellSideOrderBook, buySideOrderBook]);

    /*  useEffect(() => {
         const interval = setInterval(() => {
             GetReserves().then((reserves) => {
                 setCurrencyReserves(reserves.token0Reserve);
                 setAssetReserves(reserves.token1Reserve);
                 setStoxPrice(Number(reserves.token0Reserve.reserve) / Number(reserves.token1Reserve.reserve));
             });
         }, 5000);
 
         return () => {
             clearInterval(interval);
         };
     }, []); */


    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()

    async function cancelBuy() {
        handleSnackBarOpen("Transaction sent to wallet")
        writeContract({
            address: nvidiaOrderBookContractConfig.address,
            abi: nvidiaOrderBookContractConfig.abi,
            functionName: 'cancelBuy',
            args: [],
        })
    }

    async function cancelSell() {
        handleSnackBarOpen("Transaction sent to wallet")
        writeContract({
            address: nvidiaOrderBookContractConfig.address,
            abi: nvidiaOrderBookContractConfig.abi,
            functionName: 'cancelSell',
            args: [],
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    useEffect(() => {
        if (error) {
            handleSnackBarOpen("Transaction failed")
        }
    }, [error]);

    useEffect(() => {
        if (isPending) {
            handleSnackBarOpen("Transaction sent to wallet")
        }
    }, [isPending]);

    useEffect(() => {
        if (isConfirming) {
            handleSnackBarOpen("Transaction Loading")
        }
    }, [isConfirming]);

    useEffect(() => {
        if (isConfirmed) {
            handleSnackBarOpen("Transaction Confirmed")
        }
    }, [isConfirmed]);

    const formatNumber = (number: number, digits: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        }).format(number);
    };

    if (poolError) return <div color="white">Error: {poolError}</div>;



    return (

        <Box sx={{}}>

            <SingleComponentStack minHeight={250}>
                <Grid container>
                    <StackTitle
                        title='Limit Order Book' />
                    <Grid offset='auto' sx={{ marginTop: -1.25 }}>
                        <Fade in={dataLoading}>
                            <CircularProgress color="secondary" size="15px" />
                        </Fade>
                    </Grid>
                </Grid>
                <Grid container columns={12} display={{ xs: 'none', sm: 'flex', }} >
                    <GridAsksHeader sx={{ textAlign: 'left' }} size={4}><TableTitleTypography>ADDRESS</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={4}><TableTitleTypography>PRICE</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={2}><TableTitleTypography>QUANTITY</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={2}><TableTitleTypography>ACTION</TableTitleTypography></GridAsksHeader>
                </Grid>

                <Grid container columns={12} display={{ xs: 'flex', sm: 'none' }} >
                    <GridAsksHeader sx={{ textAlign: 'left' }} size={4}><TableTitleTypography>ADDRESS</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={5}><TableTitleTypography>PX</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={2}><TableTitleTypography>QTY</TableTitleTypography></GridAsksHeader>
                    <GridAsksHeader size={1}><TableTitleTypography></TableTitleTypography></GridAsksHeader>
                </Grid>

                {sortedSellSideOrderBook.map((order) => (
                    <Grid container key={order.address} columns={12}>
                        <GridAsksAddr size={4}>
                            <Stack>
                                <Tooltip title={order.address} placement="top">
                                    <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${order.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                        <ClickableAddressTypography color="red" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                            {truncateAddress(order.address)}
                                        </ClickableAddressTypography>
                                    </Link>
                                </Tooltip>
                            </Stack>
                        </GridAsksAddr>

                        <GridAsksNb size={{ xs: 5, sm: 4 }}>
                            <NumbersTypography color="red" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                ${formatNumber(Number(order.price.toString()) / (1_000_000_000_000_000_000.0) * stoxPrice, 2)}&#32;({Number(order.price.toString()) / (1_000_000_000_000_000_000.0)}&nbsp;{assetReserves?.symbol || 'loading'} )
                            </NumbersTypography>
                        </GridAsksNb>
                        <GridAsksNb size={2}>
                            <NumbersTypography color="red" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {Number(order.quantity.toString()) / (1_000_000_000_000_000_000.0)}
                            </NumbersTypography>
                        </GridAsksNb>
                        <GridAction size={{ xs: 1, sm: 2 }}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {order.address === connectedWalletAddress && (
                                    <Tooltip title="Cancel SELL order" placement="top">
                                        <IconButton size="small" onClickCapture={cancelSell}>
                                            <CancelIcon size={15} color="white" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Typography>
                        </GridAction>
                    </Grid>
                ))}

                <Grid sx={{ marginTop: 1 }} >
                    {sortedBuySideOrderBook.map((order) => (
                        <Grid container key={order.address} columns={12}>
                            <GridBidsAddr size={4}>
                                <Tooltip title={order.address} placement="top">
                                    <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${order.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                        <ClickableAddressTypography color='#27AE60' style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                            {truncateAddress(order.address)}
                                        </ClickableAddressTypography>
                                    </Link>
                                </Tooltip>

                            </GridBidsAddr>

                            <GridBidsNb size={{ xs: 5, sm: 4 }} >
                                <NumbersTypography color='#27AE60' style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    ${formatNumber(Number(order.price.toString()) / (1_000_000_000_000_000_000.0) * stoxPrice, 2)}&#32;({Number(order.price.toString()) / (1_000_000_000_000_000_000.0)}&nbsp;{assetReserves?.symbol || 'loading'})
                                </NumbersTypography>
                            </GridBidsNb>


                            <GridBidsNb size={2}>
                                <NumbersTypography color='#27AE60' style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {Number(order.quantity.toString()) / (1_000_000_000_000_000_000.0)}
                                </NumbersTypography>
                            </GridBidsNb>
                            <GridAction size={{ xs: 1, sm: 2 }}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {order.address === connectedWalletAddress && (
                                        <Tooltip title="Cancel BUY order" placement="top">
                                            <IconButton size="small" onClickCapture={cancelBuy}>
                                                <CancelIcon size={15} color="white" />
                                            </IconButton></Tooltip>
                                    )}
                                </Typography>
                            </GridAction>
                        </Grid>
                    ))}
                </Grid>


            </SingleComponentStack>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Box>
    );
}
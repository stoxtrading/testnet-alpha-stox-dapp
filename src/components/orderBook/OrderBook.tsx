import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { useAccount } from 'wagmi'
import { CopyIcon } from "../../components/icons/CopyIcon";
import { CancelIcon } from "../../components/icons/CancelIcon";
import {

    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'
import './OrderBook.css'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import GetReserves from '../liquidityPoolPricing/LiquidityPoolPricing'



const GridBidsNb = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#27AE60',
    alignContent: 'center',
    height: 28,


}));

const GridBidsAddr = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    textAlign: 'left',
    color: '#27AE60',
    alignContent: 'center',
    height: 28,

}));


const GridAsksHeader = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#2C3E50',
    paddingLeft: 2,
    height: 30,
    alignContent: 'center',
}));

const GridAsksNb = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#E74C3C',
    alignContent: 'center',
    height: 28,

}));

const GridAsksAddr = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    textAlign: 'left',
    color: '#E74C3C',
    alignContent: 'center',
    height: 28,

}));


const GridAction = styled(Grid)(({ theme }: { theme: any }) => ({
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#E74C3C',
    alignContent: 'center',
    height: 28,

}));










const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export default function OrderBook(): JSX.Element {

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

    const [currencyReserves, setCurrencyReserves] = useState<any | null>(null);
    const [assetReserves, setAssetReserves] = useState<any | null>(null);
    const [stoxPrice, setStoxPrice] = useState<any | null>(null);

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

    useEffect(() => {
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
    }, []);
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

    return (
        <Box sx={{
            borderRadius: 0,
            border: 1,
            color: '#ECF0F1',
        }}>
            <Stack sx={{ padding: 2 }}>



                <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                    <Grid  >
                        <Typography sx={{ fontWeight: 700 }} color='#2C3E50' variant="overline">Order Book</Typography>
                    </Grid>



                </Grid>
                <Grid container columns={12} display={{ xs: 'none', sm: 'flex', }} >
                    <GridAsksHeader sx={{ textAlign: 'left' }} size={4}>ADDRESS</GridAsksHeader>
                    <GridAsksHeader size={2}>{assetReserves !== null ? `${(assetReserves.symbol)} ` : 'Loading ccy...'} PRICE</GridAsksHeader>
                    <GridAsksHeader size={2}>{currencyReserves !== null ? `${(currencyReserves.symbol)} ` : 'Loading ccy...'} PRICE</GridAsksHeader>
                    <GridAsksHeader size={2}>QUANTITY</GridAsksHeader>
                    <GridAsksHeader size={2}>ACTION</GridAsksHeader>
                </Grid>

                <Grid container columns={10} display={{ xs: 'flex', sm: 'none' }} >
                    <GridAsksHeader sx={{ textAlign: 'left' }} size={4}>ADDR</GridAsksHeader>
                    <GridAsksHeader size={2}>{assetReserves !== null ? `${(assetReserves.symbol)} ` : 'Loading ccy...'} PRICE</GridAsksHeader>
                    <GridAsksHeader size={2}>{currencyReserves !== null ? `${(currencyReserves.symbol)} ` : 'Loading ccy...'} PRICE</GridAsksHeader>
                    <GridAsksHeader size={2}>QTY</GridAsksHeader>
                    <GridAsksHeader size={2}>ACTION</GridAsksHeader>
                </Grid>

                {sortedSellSideOrderBook.map((order, _index) => (
                    <Grid container key={order.address} columns={12}>
                        <GridAsksAddr size={4}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {truncateAddress(order.address)}
                            </Typography>
                            <IconButton size="small">
                                <CopyIcon size={15} color="white" />
                            </IconButton>
                        </GridAsksAddr>
                        <GridAsksNb size={2}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {Number(order.price.toString()) / (1_000_000_000_000_000_000.0)}
                            </Typography>
                        </GridAsksNb>
                        <GridAsksNb size={2}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {formatNumber(Number(order.price.toString()) / (1_000_000_000_000_000_000.0) * stoxPrice, 4)}
                            </Typography>
                        </GridAsksNb>
                        <GridAsksNb size={2}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {Number(order.quantity.toString()) / (1_000_000_000_000_000_000.0)}
                            </Typography>
                        </GridAsksNb>
                        <GridAction size={2}>
                            <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                {order.address === connectedWalletAddress && (
                                    <Tooltip title="Cancel SELL order" placement="top">
                                        <IconButton size="small" onClickCapture={cancelSell}>
                                            <CancelIcon size={15} color="#2C3E50" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Typography>
                        </GridAction>
                    </Grid>
                ))}

                <Grid sx={{ marginTop: 1 }} >
                    {sortedBuySideOrderBook.map((order, _index) => (
                        <Grid container key={order.address} columns={12}>
                            <GridBidsAddr size={4}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {truncateAddress(order.address)}
                                </Typography>
                                <IconButton size="small">
                                    <CopyIcon size={15} color="white" />
                                </IconButton>
                            </GridBidsAddr>
                            <GridBidsNb size={2}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {Number(order.price.toString()) / (1_000_000_000_000_000_000.0)}
                                </Typography>
                            </GridBidsNb>
                            <GridBidsNb size={2}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {formatNumber(Number(order.price.toString()) / (1_000_000_000_000_000_000.0) * stoxPrice, 4)}
                                </Typography>
                            </GridBidsNb>
                            <GridBidsNb size={2}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {Number(order.quantity.toString()) / (1_000_000_000_000_000_000.0)}
                                </Typography>
                            </GridBidsNb>
                            <GridAction size={2}>
                                <Typography variant="caption" style={{ fontWeight: order.address === connectedWalletAddress ? 'bold' : 'normal' }}>
                                    {order.address === connectedWalletAddress && (
                                        <Tooltip title="Cancel BUY order" placement="top">
                                            <IconButton size="small" onClickCapture={cancelBuy}>
                                                <CancelIcon size={15} color="#2C3E50" />
                                            </IconButton></Tooltip>
                                    )}
                                </Typography>
                            </GridAction>
                        </Grid>
                    ))}
                </Grid>


            </Stack>
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
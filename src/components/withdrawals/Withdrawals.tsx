import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi'
import Grid from '@mui/material/Grid2';
import { Typography, Stack, } from '@mui/material';
import {

    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useState, useEffect, } from 'react';

import Snackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

const WithdrawButton = styled(Button)<ButtonProps>(() => ({
    color: '#1e163b',
    width: 100,

    height: 24,
    backgroundColor: '#ECF0F1',
    '&:hover': {
        backgroundColor: '#ECF0F1',
    },
}));


export default function Withdrawals() {
    const { address: connectedWalletAddress } = useAccount();

    const { data: withdrawalbleSecurities } = useReadContract({
        ...nvidiaOrderBookContractConfig,
        functionName: 'getWithdrawableSecurities',
        args: [],
        account: connectedWalletAddress,
        query: { refetchInterval: 1000, refetchIntervalInBackground: true }
    })

    const { data: withdrawalbleCurrencies } = useReadContract({
        ...nvidiaOrderBookContractConfig,
        functionName: 'getWithdrawableCurrencies',
        args: [],
        account: connectedWalletAddress,
        query: { refetchInterval: 1000, refetchIntervalInBackground: true }
    })

    const withdrawalbleSecuritiesInBigInt = withdrawalbleSecurities ? BigInt(withdrawalbleSecurities.toString()) : 0n;
    const withdrawalbleSecuritiesFormatted = withdrawalbleSecuritiesInBigInt / (10n ** 18n);

    const withdrawalbleCurrenciesInBigInt = withdrawalbleCurrencies ? BigInt(withdrawalbleCurrencies.toString()) : 0n;
    const withdrawalbleCurrenciesFormatted = withdrawalbleCurrenciesInBigInt / (10n ** 18n);


    const {
        data: withdrawCurrenciesHash,
        error: withdrawCurrenciesError,
        isPending: withdrawCurrenciesIsPending,
        writeContract: withdrawCurrenciesWriteContract
    } = useWriteContract()

    const { isLoading: withdrawCurrenciesIsConfirming, isSuccess: withdrawCurrenciesIsConfirmed } =
        useWaitForTransactionReceipt({
            hash: withdrawCurrenciesHash,
        })

    async function withdrawCurrencies() {
        await withdrawCurrenciesWriteContract({
            address: nvidiaOrderBookContractConfig.address,
            abi: nvidiaOrderBookContractConfig.abi,
            functionName: 'withdrawCurrencies',
            args: [],
        })
    }




    const {
        data: withdrawSecuritiesHash,
        error: withdrawSecuritiesError,
        isPending: withdrawSecuritiesIsPending,
        writeContract: withdrawSecuritiesWriteContract
    } = useWriteContract()

    const { isLoading: withdrawSecuritiesIsConfirming, isSuccess: withdrawSecuritiesIsConfirmed } =
        useWaitForTransactionReceipt({
            hash: withdrawSecuritiesHash,
        })



    async function withdrawSecurities() {
        await withdrawSecuritiesWriteContract({
            address: nvidiaOrderBookContractConfig.address,
            abi: nvidiaOrderBookContractConfig.abi,
            functionName: 'withdrawSecurities',
            args: [],
        })
    }

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        if (withdrawCurrenciesIsConfirmed) {
            handleSnackBarOpen('Withdrawal of currencies successful');
        }
    }
        , [withdrawCurrenciesIsConfirmed])

    useEffect(() => {
        if (withdrawSecuritiesIsConfirmed) {
            handleSnackBarOpen('Withdrawal of securities successful');
        }
    }
        , [withdrawSecuritiesIsConfirmed])

    useEffect(() => {
        if (withdrawCurrenciesError) {
            handleSnackBarOpen('Error withdrawing currencies');
        }
    }
        , [withdrawCurrenciesError])

    useEffect(() => {
        if (withdrawSecuritiesError) {
            handleSnackBarOpen('Error withdrawing securities');
        }
    }
        , [withdrawSecuritiesError])




    return (
        <Box


        >



           <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2}} height={120}>

                <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                    <Grid size={1} >
                        <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">Withdrawals</Typography>
                    </Grid>

                </Grid>


                <Grid container >
                    <Grid size={6}>
                        <Typography color='#1e163b' variant="body2" >STOX</Typography>
                    </Grid>

                    <Grid size={6}>

                        <Typography color='#1e163b' variant="body2">NVIDIA</Typography>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid size={6} >
                        <Typography variant="body2" color='#1e163b' sx={{ fontWeight: 700 }}>{withdrawalbleCurrenciesFormatted?.toString()}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body2" color='#1e163b' sx={{ fontWeight: 700 }}>{withdrawalbleSecuritiesFormatted?.toString()}</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                    <Grid size={6} >

                        <WithdrawButton
                            disabled={withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming}
                            onClick={withdrawCurrencies}
                            color="error"
                            variant="contained"
                            size="small"
                        >
                            {withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? 'Pending...' : <>
                                WITHDRAW
                            </>}
                        </WithdrawButton>
                    </Grid>


                    <Grid size={6} >



                        <WithdrawButton
                            disabled={withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming}
                            onClick={withdrawSecurities}
                            color="error"
                            variant="contained"
                            size="small"

                        >
                            {withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? 'Pending...' : <>
                                WITHDRAW
                            </>}</WithdrawButton>


                    </Grid>

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
    )
}



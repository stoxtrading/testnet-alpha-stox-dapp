import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi'
import Grid from '@mui/material/Grid2';
import {

    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'

import Box from '@mui/material/Box';
import React, { useState, useEffect, } from 'react';

import Snackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import {  NumbersTypography, GenericTypography,  } from '../../assets/elements/CustomTypography';
import { CustomButton } from '../../assets/elements/CustomButton';




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
        <Box >
            <SingleComponentStack  >

                <StackTitle
                    title='SETTLEMENT' />

                <Grid container direction={'column'} rowGap={1} >
                    <Grid container >
                        <Grid size={6} justifyItems={'center'}>
                            <GenericTypography
                            fontSize = '1.5rem'
                            >STOX</GenericTypography>
                        </Grid>

                        <Grid size={6} justifyItems={'center'}>

                            <GenericTypography
                            fontSize = '1.5rem'>NVIDIA</GenericTypography>
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid size={6} justifyItems={'center'} >
                            <NumbersTypography fontSize={"1.2em"}>{withdrawalbleCurrenciesFormatted?.toString()}</NumbersTypography>
                        </Grid>
                        <Grid size={6} justifyItems={'center'}>
                            <NumbersTypography fontSize={"1.2em"}>{withdrawalbleSecuritiesFormatted?.toString()}</NumbersTypography>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid container size={6} justifyContent={'center'} >

                        <CustomButton
                            color = 'black'
                            fontSize='0.9rem'
                            height={40}
                            width={145}
                            backgroundColor={"orange"}
                            text={withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? 'Pending...' : 'WITHDRAW'}
                            onClick={withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? () => {} : withdrawCurrencies}
                            sx={{
                                opacity: withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? 0.7 : 1,
                                cursor: withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? 'not-allowed' : 'pointer',
                                pointerEvents: withdrawCurrenciesIsPending || withdrawCurrenciesIsConfirming ? 'none' : 'auto'
                            }}
                            />

                        </Grid>


                        <Grid container size={6} justifyContent={'center'} >



                        <CustomButton
                            color = 'black'
                            fontSize='0.9rem'
                            height={40}
                            width={145}
                            backgroundColor={"orange"}
                            text={withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? 'Pending...' : 'WITHDRAW'}
                            onClick={withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? () => {} : withdrawSecurities}
                            sx={{
                                opacity: withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? 0.7 : 1,
                                cursor: withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? 'not-allowed' : 'pointer',
                                pointerEvents: withdrawSecuritiesIsPending || withdrawSecuritiesIsConfirming ? 'none' : 'auto'
                            }}
                            />


                        </Grid>

                    </Grid>
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
    )
}



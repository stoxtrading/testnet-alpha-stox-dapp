import Grid from '@mui/material/Grid2';
import { useAccount, useReadContract } from 'wagmi'
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { Typography, Stack } from '@mui/material';
import Box from '@mui/material/Box';


export default function StoxEcosystem() {

    const { address: connectedWalletAddress } = useAccount()


    const { data: stoxBalance } = useReadContract({
        ...stoxContractConfig,
        functionName: 'balanceOf',
        args: [connectedWalletAddress as `0x${string}`],
        query: { refetchInterval: 1000, refetchIntervalInBackground: true }

    })

    const { data: nvidiaBalance } = useReadContract({
        ...nvidiaContractConfig,
        functionName: 'balanceOf',
        args: [connectedWalletAddress as `0x${string}`],
        query: { refetchInterval: 1000, refetchIntervalInBackground: true }
    })

    const nvidiaBalanceInBigInt = nvidiaBalance ? BigInt(nvidiaBalance.toString()) : 0n;
    const nvidiaBalanceFormatted = nvidiaBalanceInBigInt / (10n ** 18n);

    const stoxBalanceInBigInt = stoxBalance ? BigInt(stoxBalance.toString()) : 0n;
    const stoxBalanceFormatted = stoxBalanceInBigInt / (10n ** 18n);


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
                    <Grid size={1} >
                        <Typography sx={{ fontWeight: 700 }} color='#2C3E50' variant="overline">Balances</Typography>
                    </Grid>

                </Grid>

                <Grid container >
                    <Grid size={6}>
                        <Typography variant="body2" color='#2C3E50'>STOX </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body2" color='#2C3E50'>NVIDIA</Typography>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid size={6}>
                        <Typography color='#2C3E50' variant="body2" sx={{ fontWeight: 700 }}>{formatNumber(Number(stoxBalanceFormatted), 2)}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography color='#2C3E50' variant="body2" sx={{ fontWeight: 700 }}>{formatNumber(Number(nvidiaBalanceFormatted), 2)}</Typography>
                    </Grid>
                </Grid>



            </Stack>
        </Box>

    )

}
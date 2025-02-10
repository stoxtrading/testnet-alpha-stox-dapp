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

        <Box>

            <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.5)', borderRadius: 2 }} height={120}>
                <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                    <Grid size={1} >
                        <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">Balances</Typography>
                    </Grid>

                </Grid>

                <Grid container >
                    <Grid size={6}>
                        <Typography variant="body2" color='#1e163b'>STOX </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body2" color='#1e163b'>NVIDIA</Typography>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid size={6}>
                        <Typography color='#1e163b' variant="body2" sx={{ fontWeight: 700 }}>{formatNumber(Number(stoxBalanceFormatted), 2)}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography color='#1e163b' variant="body2" sx={{ fontWeight: 700 }}>{formatNumber(Number(nvidiaBalanceFormatted), 2)}</Typography>
                    </Grid>
                </Grid>



            </Stack>
        </Box>

    )

}
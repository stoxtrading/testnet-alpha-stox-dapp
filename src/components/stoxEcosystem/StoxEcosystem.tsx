import Grid from '@mui/material/Grid2';
import { useAccount, useReadContract } from 'wagmi'
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import Box from '@mui/material/Box';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { TableTitleTypography, NumbersTypography } from '../../assets/elements/CustomTypography';



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

            <SingleComponentStack height={120}>
            <StackTitle
                title='Balances'  />

                <Grid container >
                    <Grid size={6}>
                    <TableTitleTypography>STOX</TableTitleTypography>
                    </Grid>
                    <Grid size={6}>
                    <TableTitleTypography>NVIDIA</TableTitleTypography>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid size={6}>
                        <NumbersTypography sx={{ fontWeight: 700 }}>{formatNumber(Number(stoxBalanceFormatted), 2)}</NumbersTypography>
                    </Grid>
                    <Grid size={6}>
                        <NumbersTypography sx={{ fontWeight: 700 }}>{formatNumber(Number(nvidiaBalanceFormatted), 2)}</NumbersTypography>
                    </Grid>
                </Grid>
            </SingleComponentStack>
        </Box>

    )

}
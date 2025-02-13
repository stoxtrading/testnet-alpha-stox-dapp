import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AmountTextField from '../../assets/elements/CustomTextFields';
import SubSectionTitleTypography from '../../assets/elements/CustomTypography';
import ApproveTransfer from '../liquidityPoolPricing/ApproveTransfer';
import { mockUsdtContractConfig } from '../../assets/contracts/dev/MockUsdt';
import { nonFongiblePoolManagerContractConfig } from '../../assets/contracts/dev/NonFongiblePoolManager';


import Stack from '@mui/material/Stack';

export default function LiquidityCreation() {

    const [usdtQuantity, setUsdtQuantity] = useState(0);
    const [stoxQuantity, setStoxQuantity] = useState(0);
    const [lowerTick, setLowerTick] = useState(0);
    const [upperTick, setUpperTick] = useState(0);
    const [usdtMinAmt, setUsdtMinAmt] = useState(0);
    const [stoxMinAmt, setStoxMinAmt] = useState(0);


    function sendTransferApprovals () {
        console.log("Sending Transfer Approvals")
        ApproveTransfer.sendApproval(mockUsdtContractConfig.address,
            nonFongiblePoolManagerContractConfig.address, 
            usdtQuantity, )

    }

    return (
        <Stack rowGap={2}>
            <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid size={12} container justifyContent="center" >
                    <SubSectionTitleTypography>
                        Active Liquitity  Range
                    </SubSectionTitleTypography>
                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="Lower Tick"
                        onChange={(e) => setLowerTick(Number(e.target.value))}
                        value={lowerTick}

                    />
                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="Upper Tick"
                        onChange={(e) => setUpperTick(Number(e.target.value))}
                        value={upperTick}
                    />
                </Grid>
            </Grid>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid size={12} container justifyContent="center" >
                    <SubSectionTitleTypography>
                        Liquidity
                    </SubSectionTitleTypography>
                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="USDT Amt"
                        onChange={(e) => setUsdtQuantity(Number(e.target.value))}
                        value={usdtQuantity}
                    />
                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="STOX Amt"
                        onChange={(e) => setStoxQuantity(Number(e.target.value))}
                        value={stoxQuantity}
                    />
                </Grid>
            </Grid>
            <Grid container rowSpacing={2}>
                <Grid size={12} container justifyContent="center" >
                    <SubSectionTitleTypography>
                        Slippage Protection
                    </SubSectionTitleTypography>

                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="USDT Min Amt"
                        onChange={(e) => setUsdtMinAmt(Number(e.target.value))}
                        value={usdtMinAmt}
                    />
                </Grid>
                <Grid size={6} container justifyContent="center">
                    <AmountTextField
                        label="STOX Min Amt"
                        onChange={(e) => setStoxMinAmt(Number(e.target.value))}
                        value={stoxMinAmt}
                    />
                </Grid>
            </Grid>
        </Stack>

    )
}
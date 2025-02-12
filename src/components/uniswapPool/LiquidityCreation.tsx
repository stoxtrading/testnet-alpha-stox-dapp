import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AmountTextField from '../../assets/elements/CustomTextFields';
import Stack from '@mui/material/Stack';

export default function LiquidityCreation() {

    const [usdtQuantity, setUsdtQuantity] = useState(0);
    const [stoxQuantity, setStoxQuantity] = useState(0);
    const [lowerTick, setLowerTick] = useState(0);  
    const [upperTick, setUpperTick] = useState(0);

    return (
        <Stack rowGap={2}>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid size={6}>
                    <AmountTextField
                        label="Lower Tick"
                        onChange={(e) => setLowerTick(Number(e.target.value))}
                        value={lowerTick}
                        
                    />
                </Grid>
                <Grid size={6}>
                    <AmountTextField
                        label="Upper Tick"
                        onChange={(e) => setUpperTick(Number(e.target.value))}
                        value={upperTick}
                    />
                </Grid>
            </Grid>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid size={6}>
                    <AmountTextField
                        label="USDT Amt"
                        onChange={(e) => setUsdtQuantity(Number(e.target.value))}
                        value={usdtQuantity}
                    />
                </Grid>
                <Grid size={6}>
                    <AmountTextField
                        label="STOX Amt"
                        onChange={(e) => setStoxQuantity(Number(e.target.value))}
                        value={stoxQuantity}
                    />
                </Grid>
            </Grid>
        </Stack>

    )
}
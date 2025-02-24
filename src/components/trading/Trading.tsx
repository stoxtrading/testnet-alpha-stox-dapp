import { Box, Switch } from "@mui/material";
import SingleComponentStack from "../../assets/elements/CustomStack";
import useRealTimePrice from '../../components/customHooks/UseRealTimePrice';
import Grid from '@mui/material/Grid2';
import { NumbersTypography, TableTitleTypography } from "../../assets/elements/CustomTypography";
import { CustomButton } from "../../assets/elements/CustomButton";
import CustomTextField from "../../assets/elements/CustomTextField";
import { useState } from "react";

export default function Trading() {
    const stockTicker = 'NVDA'
    const { price, } = useRealTimePrice(stockTicker);
    const [isMarketOrder, setIsMarketOrder] = useState(true);

    const handleOrderTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMarketOrder(event.target.checked);
    };

    return (
        <Box>
            <SingleComponentStack>
                <Grid container>
                    <Grid size={6} justifyItems={"center"} >
                        <TableTitleTypography>
                            {stockTicker}
                        </TableTitleTypography>
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <NumbersTypography>
                            {price !== null ? <NumbersTypography>{price.toFixed(2)}</NumbersTypography> : <NumbersTypography>Loading...</NumbersTypography>}
                        </NumbersTypography>
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomButton backgroundColor={""} text={"BUY"} onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        />
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomButton backgroundColor={""} text={"SELL"} onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        />
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <Switch
                            checked={isMarketOrder}
                            onChange={handleOrderTypeChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />Market Order

                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomTextField label={"Quantity"} defaultValue={0} onChange={function (): void {
                            throw new Error("Function not implemented.");
                        }
                        } />
                    </Grid>
                </Grid>



            </SingleComponentStack>
        </Box>
    );



}
import { Box, Stack, Switch } from "@mui/material";
import SingleComponentStack from "../../assets/elements/CustomStack";
import useRealTimePrice from '../../components/customHooks/UseRealTimePrice';
import Grid from '@mui/material/Grid2';
import { NumbersTypography, SubtitleTypography } from "../../assets/elements/CustomTypography";
import { CustomButton } from "../../assets/elements/CustomButton";
import CustomTextField from "../../assets/elements/CustomTextField";
import { useState } from "react";
import MarketOrderTradeDetailsModal from "./orderModals/MarketOrderTradeDetailsModal";
import { SimpleSnackbar } from '../../assets/elements/CustomSnackbars';

export default function Trading() {
    const stockTicker = 'NVDA'
    const { price, } = useRealTimePrice(stockTicker);
    const [isMarketOrder, setIsMarketOrder] = useState(true);
    const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
    const [quantity, setQuantity] = useState<number>(0);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>("success");

    const handleOrderTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMarketOrder(event.target.checked);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[0-9.]*$/.test(value)) {
            setQuantity(Number(value));
        }
    };

    const handleCloseMarketOrderModal = () => {
        setMarketOrderModalOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const [marketOrderModalOpen, setMarketOrderModalOpen] = useState(false);

    function triggerSnackbar(message: string, severity: 'success' | 'error' | 'warning' | 'info') {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    function OpenTradeDetailsModal(direction: string) {
        if (quantity === 0) {
            triggerSnackbar("Please enter a quantity", "error");
            return;
        }

        console.log(`Open ${direction} trade details popup`);
        setDirection(direction as 'BUY' | 'SELL');
        setMarketOrderModalOpen(true);
    }

    return (
        <Box>
            <SingleComponentStack  >
                <Grid container sx={{ marginBottom: "10px" }}>
                    <Grid size={6} justifyItems={"center"} >
                        <SubtitleTypography fontSize='1.5em'>
                            {stockTicker}
                        </SubtitleTypography>
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        {price !== null ? <NumbersTypography fontSize={"1.75em"}>${price.toFixed(3)}</NumbersTypography> : <NumbersTypography>Loading...</NumbersTypography>}
                    </Grid>
                </Grid>
                <Grid container sx={{ marginBottom: "10px" }}>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomButton
                            fontSize='1.1rem'
                            height={40}
                            width={100}
                            backgroundColor={"green"}
                            text={"BUY"}
                            onClick={function (): void {
                                OpenTradeDetailsModal("BUY");
                            }}
                        />
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomButton
                            fontSize='1.1rem'
                            height={40}
                            width={100}
                            backgroundColor={"red"}
                            text={"SELL"}
                            onClick={function (): void {
                                OpenTradeDetailsModal("SELL");
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid size={6} justifyItems={"center"}>
                        <Stack>
                            <Grid container justifyContent={"center"}>
                                <Switch
                                    color='warning'
                                    checked={isMarketOrder}
                                    onChange={handleOrderTypeChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Grid container>
                                <Grid size={4} justifyItems={"center"}>
                                    <SubtitleTypography fontSize='0.5rem'>
                                        LIMIT
                                    </SubtitleTypography>
                                </Grid>
                                <Grid size={2} justifyItems={"center"}>
                                    <SubtitleTypography fontSize='0.5rem'>
                                        |
                                    </SubtitleTypography>
                                </Grid>
                                <Grid size={4} >
                                    <SubtitleTypography fontSize='0.5rem'>
                                        MARKET
                                    </SubtitleTypography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid size={6} justifyItems={"center"}>
                        <CustomTextField
                            marginLeft='1.5ch'
                            marginTop='0.9ch'
                            width='8em'
                            label={"Quantity"}
                            defaultValue={0}
                            onChange={handleQuantityChange}
                        />
                    </Grid>
                </Grid>
            </SingleComponentStack>

            <MarketOrderTradeDetailsModal
                open={marketOrderModalOpen}
                handleClose={handleCloseMarketOrderModal}
                direction={direction}
                quantity={quantity}
                stockTicker={stockTicker}
                isMarketOrder = {isMarketOrder}
            />
            <SimpleSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
}
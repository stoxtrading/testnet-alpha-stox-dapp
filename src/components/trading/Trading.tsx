import { Box, Divider, Stack, Switch } from "@mui/material";
import SingleComponentStack from "../../assets/elements/CustomStack";
import useRealTimePrice from '../../components/customHooks/UseRealTimePrice';
import Grid from '@mui/material/Grid2';
import { NumbersTypography, SubtitleTypography } from "../../assets/elements/CustomTypography";
import { CustomButton } from "../../assets/elements/CustomButton";
import { useState } from "react";
import MarketOrderTradeDetailsModal from "./orderModals/MarketOrderTradeDetailsModal";
import StackTitle from "../buildingBlocks/StackTitle";

export default function Trading() {
    const stockTicker = 'NVDA'
    const { price, } = useRealTimePrice(stockTicker);
    const [isMarketOrder, setIsMarketOrder] = useState(true);
    const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');



    const handleOrderTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMarketOrder(event.target.checked);
    };


    const handleCloseMarketOrderModal = () => {
        setMarketOrderModalOpen(false);
    };


    const [marketOrderModalOpen, setMarketOrderModalOpen] = useState(false);



    function OpenTradeDetailsModal(direction: string) {


        console.log(`Open ${direction} trade details popup`);
        setDirection(direction as 'BUY' | 'SELL');
        setMarketOrderModalOpen(true);
    }

    return (
        <Box>
            <SingleComponentStack  >
                <StackTitle
                    title='TRADING' />
                <Divider color="#595959" sx={{ marginBottom: "0.5rem" }} />                
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
                <Grid container alignItems={"center"} justifyContent={"center"}>
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
            </SingleComponentStack>

            <MarketOrderTradeDetailsModal
                open={marketOrderModalOpen}
                handleClose={handleCloseMarketOrderModal}
                direction={direction}
                stockTicker={stockTicker}
                isMarketOrder={isMarketOrder}
            />

        </Box>
    );
}
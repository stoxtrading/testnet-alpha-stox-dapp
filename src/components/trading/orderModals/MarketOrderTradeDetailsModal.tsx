import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SingleComponentStack from "../../../assets/elements/CustomStack";
import useRealTimePrice from '../../../components/customHooks/UseRealTimePrice';
import Grid from '@mui/material/Grid2';
import { NumbersTypography, SubtitleTypography, TableTitleTypography } from "../../../assets/elements/CustomTypography";
import { CustomButton } from "../../../assets/elements/CustomButton";
import CustomTextField from "../../../assets/elements/CustomTextField";
import { Box, } from "@mui/material";
import CurrencyStepper from './CurrencyStepper';
import getPoolReserves from '../../liquidityPoolPricing/LiquidityPoolPricing'
import { useEffect, useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

};
interface TradeDetailsModalProps {
  open: boolean;
  stockTicker: string;
  direction: 'BUY' | 'SELL';
  quantity: number;
  handleClose: () => void;
}

const MarketOrderTradeDetailsModal: React.FC<TradeDetailsModalProps> = ({ open, direction, quantity, stockTicker, handleClose }) => {
  const { price, } = useRealTimePrice(stockTicker);
  const buttonColor = direction === 'BUY' ? 'green' : 'red';
  const [stoxPrice, setStoxPrice] = useState<number>(0);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9.]*$/.test(value)) {
      console.log("new qty", value)
      setNewQuantity(Number(value));
    }
  };
  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);


  useEffect(() => {
    const fetchPoolReserves = async () => {
      try {
        const reserves = await getPoolReserves("0xDA7FeB22c7701c4DFc05bF34F27AfD122dcd49e2");
        setStoxPrice(Number(reserves.token0.reserve) / Number(reserves.token1.reserve));
      } catch (err) {
        if (err instanceof Error) {
          setPoolError(err.message);
        } else {
          setPoolError(String(err));
        }
      } finally {
        setDataLoading(false)
      }
    };

    fetchPoolReserves();
  }, []);


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <SingleComponentStack width="20em" height="18em" rowGap="0.5em">
            <Grid container sx={{ marginBottom: "10px" }}>
              <Grid size={6} justifyItems={"center"}  >
                <SubtitleTypography fontSize='1.5em'>
                  {stockTicker}
                </SubtitleTypography>
              </Grid>
              <Grid size={6} justifyItems={"center"} alignItems={"center"} >
                {price !== null ? <NumbersTypography fontSize={"1.75em"}>{price.toFixed(3)}</NumbersTypography> : <NumbersTypography>Loading...</NumbersTypography>}

              </Grid>
            </Grid>
            <Grid container sx={{ marginBottom: "10px" }}>
              <Grid size={6} justifyItems={"center"}>
                <CustomButton
                  fontSize='1.1rem'
                  height={40}
                  width={100}
                  backgroundColor={buttonColor}
                  text={direction}
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </Grid>
              <Grid size={6} justifyItems={"center"}>
                <CustomTextField
                  marginLeft='2ch'
                  marginTop='0.1ch'
                  label={"Quantity"}
                  defaultValue={quantity}
                  width='7em'
                  onChange={handleQuantityChange}

                />
              </Grid>
            </Grid>
            <Grid size={12} justifyItems={"center"} >
              <TableTitleTypography>
                select currency
              </TableTitleTypography>
            </Grid>
            <Grid size={12}>
              <CurrencyStepper />
            </Grid>
            <Grid container marginTop={'1em'} justifyContent={"center"}>
              <CustomTextField
                width='8em'
                marginLeft='0ch'
                marginTop='0ch'
                label={"Volume"}
                defaultValue={Number((newQuantity / stoxPrice).toFixed(6))}
                value={Number((price*newQuantity / stoxPrice).toFixed(6))}


              />

            </Grid>
          </SingleComponentStack>




        </Box >
      </Fade>
    </Modal>
  );
};

export default MarketOrderTradeDetailsModal;
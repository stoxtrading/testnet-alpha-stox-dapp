import * as React from 'react'
import {
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'
import { styled } from '@mui/material/styles';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing'
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { TableTitleTypography, NumbersTypography, ButtonTypography } from '../../assets/elements/CustomTypography';
import { CircularProgress, Fade, } from '@mui/material';


export default function Trading() {

  const [price, setPrice] = useState('0');
  const [priceInStox, setPriceInStox] = useState(0);
  const [quantity, setQuantity] = useState('0');
  const [dataLoading, setDataLoading] = useState(false);




  const handleBackDropOpen = () => {
    setDataLoading(true);
  };

  const handleBackDropClose = () => {
    setDataLoading(false);
  };



  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9.]*$/.test(value)) {
      setPrice(value);
      setPriceInStox(Number(value) / stoxPrice);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9.]*$/.test(value)) {
      setQuantity(value);
    }
  };




  const SellButton = styled(Button)<ButtonProps>(() => ({
    color: '#FFFFFF',
    height: 24,
    width: 100,
    backgroundColor: '#E74C3C',
    '&:hover': {
      backgroundColor: '#E74C3C',
    },
  }));

  const BuyButton = styled(Button)<ButtonProps>(() => ({
    color: '#FFFFFF',
    height: 24,
    width: 100,
    backgroundColor: '#27AE60',
    '&:hover': {
      backgroundColor: '#27AE60',
    },
  }));

  const {
    data: stoxApproveHash,
    error: stoxApproveError,
    isPending: stoxApproveIsPending,
    writeContract: stoxApproveWriteContract
  } = useWriteContract()

  const {
    data: nvidiaApproveHash,
    error: nvidiaApproveError,
    isPending: nvidiaApproveIsPending,
    writeContract: nvidiaApproveWriteContract
  } = useWriteContract()

  const {
    data: buyOrderHash,
    error: buyOrderError,
    isPending: buyOrderIsPending,
    writeContract: buyOrderWriteContract
  } = useWriteContract()

  const {
    data: sellOrderHash,
    error: sellOrderError,
    isPending: sellOrderIsPending,
    writeContract: sellOrderWriteContract
  } = useWriteContract()

  const { isLoading: stoxApproveIsConfirming, isSuccess: stoxApproveIsConfirmed } =
    useWaitForTransactionReceipt({
      hash: stoxApproveHash,
    })

  const { isLoading: nvidiaApproveIsConfirming, isSuccess: nvidiaApproveIsConfirmed } =
    useWaitForTransactionReceipt({
      hash: nvidiaApproveHash,
    })

  const { isLoading: buyOrderIsConfirming, isSuccess: buyOrderIsConfirmed } =
    useWaitForTransactionReceipt({
      hash: buyOrderHash,
    })

  const { isLoading: sellOrderIsConfirming, isSuccess: sellOrderIsConfirmed } =
    useWaitForTransactionReceipt({
      hash: sellOrderHash,
    })

  /*   const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      }) */

  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

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
  async function placeBuyOrder() {


    // 1. Deposit STOX as collateral 

    // const stoxMultiplier = ethers.FixedNumber.fromString(stoxPrice.toString(),{ decimals: 30 , signed: false , width: 128 })

    // console.log("stoxMultiplier", stoxMultiplier)
    console.log("priceInStox", priceInStox)



    console.log(ethers.FixedNumber.fromString(price))

    // const priceFN = ethers.FixedNumber.fromString(price).div(stoxMultiplier)
    const quantityFN = ethers.FixedNumber.fromString(quantity)

    const priceInStoxFn = ethers.FixedNumber.fromString(priceInStox.toString()).round(0)



    //const decimalsFN = ethers.FixedNumber.fromString("1000000000000000000")

    //console.log("priceFN", priceFN.value)
    console.log("quantityFN", quantityFN.value)

    // console.log("Approval requested for: ", (priceFN.mul(quantityFN)).value)
    const result = await stoxApproveWriteContract({
      address: stoxContractConfig.address,
      abi: stoxContractConfig.abi,
      functionName: 'approve',
      args: [nvidiaOrderBookContractConfig.address, BigInt((priceInStoxFn.mul(quantityFN)).value.toString())],
    })
    console.log("result", result)
    console.log("Waiting for confirmation")

  }

  useEffect(() => {
    if (stoxPrice == null) {
      return
    }

    //const stoxMultiplier = ethers.FixedNumber.fromString(stoxPrice.toString())

    console.log(ethers.FixedNumber.fromString(price))

    // const priceFN = ethers.FixedNumber.fromString(price).mul(stoxMultiplier)
    const quantityFN = ethers.FixedNumber.fromString(quantity)

    const priceInStoxFn = ethers.FixedNumber.fromString(priceInStox.toString()).round(0)


    if (stoxApproveIsConfirmed) {
      console.log("stoxApproveIsConfirmed", stoxApproveIsConfirmed)
      buyOrderWriteContract({
        address: nvidiaOrderBookContractConfig.address,
        abi: nvidiaOrderBookContractConfig.abi,
        functionName: 'placeBuy',
        args: [BigInt(priceInStoxFn.value.toString()), BigInt(quantityFN.value.toString())],
      })
    }
  }
    , [stoxApproveIsConfirmed])

  useEffect(() => {
    if (buyOrderIsConfirmed) {
      handleSnackBarOpen("Order placed successfully")
    }
  }
    , [buyOrderIsConfirmed])

  useEffect(() => {
    if (sellOrderIsConfirmed) {
      handleSnackBarOpen("Order placed successfully")
    }
  }
    , [sellOrderIsConfirmed])

  useEffect(() => {

    if (stoxApproveError) {
      handleSnackBarOpen("Approval failed")
    }
  }, [stoxApproveError])

  useEffect(() => {

    if (nvidiaApproveError) {
      handleSnackBarOpen("Approval failed")
    }
  }, [nvidiaApproveError])

  useEffect(() => {

    if (buyOrderError) {
      handleSnackBarOpen("Order failed")
    }
  }, [buyOrderError])

  useEffect(() => {

    if (sellOrderError) {
      handleSnackBarOpen("Order failed")
    }
  }, [sellOrderError])

  interface TokenInfo {
    address: string;
    symbol: string;
    reserve: string;
  }
  const [assetReserves, setAssetReserves] = useState<TokenInfo>();
  const [stoxPrice, setStoxPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoolReserves = async () => {
      try {
        handleBackDropOpen();
        const reserves = await getPoolReserves(`${import.meta.env.VITE_APP_POOL_ADDRESS}`);
        setAssetReserves(reserves.token1);
        setStoxPrice(Number(reserves.token0.reserve) / Number(reserves.token1.reserve));
        console.log("fetching STOX reserves", Number(reserves.token0.reserve) / Number(reserves.token1.reserve))
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        handleBackDropClose();

      }
    };

    fetchPoolReserves();
  }, []);

  async function placeSellOrder() {

    const quantityFN = ethers.FixedNumber.fromString(quantity)


    nvidiaApproveWriteContract({
      address: nvidiaContractConfig.address,
      abi: nvidiaContractConfig.abi,
      functionName: 'approve',
      args: [nvidiaOrderBookContractConfig.address, BigInt(quantityFN.value.toString())],
    })
    console.log("Waiting for confirmation")

  }

  useEffect(() => {
    if (nvidiaApproveIsConfirmed) {

      //const priceFN = ethers.FixedNumber.fromString(price)
      const quantityFN = ethers.FixedNumber.fromString(quantity)

      const priceInStoxFn = ethers.FixedNumber.fromString(priceInStox.toString()).round(0)


      sellOrderWriteContract({
        address: nvidiaOrderBookContractConfig.address,
        abi: nvidiaOrderBookContractConfig.abi,
        functionName: 'placeSell',
        args: [BigInt(priceInStoxFn.value.toString()), BigInt(quantityFN.value.toString())],
      })
    }
  }, [nvidiaApproveIsConfirmed])

  const formatNumber = (number: number, digits: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(number);
  };
  if (error) return <div color="white">Error: {error}</div>;


  return (
    <Box sx={{

    }}>

      <SingleComponentStack height={{ xs: 180, md: 120 }}>
        <Grid container>
          <StackTitle
            title='Trading' />
          <Grid offset='auto' sx={{  marginTop: -1.25 }}>
            <Fade in={dataLoading}>
              <CircularProgress color="secondary" size="15px"/>
            </Fade>
          </Grid>
        </Grid>
        <Grid container direction={'column'} rowGap={1} >
          <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}  >

            <Grid display="flex" justifyContent="center" alignItems="center" size="grow">

              <TextField
                size="small"
                label="USD$"
                id="outlined-basic"

                onChange={handlePriceChange}
                defaultValue={0}
                sx={{
                  color:"white",
                  width: '10ch',
                  height: '35px', // Increase the height
                  '& .MuiOutlinedInput-root': {
                    height: '100%', // Ensure the input takes the full height of the TextField
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px', // Adjust padding to vertically center the text
                    fontFamily: 'Michroma',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color:"white",
                  },
                  '& .MuiInputAdornment-root': {
                    height: '25px',

                  },

                }}
              />
            </Grid>

            <Grid display="flex" justifyContent="center" alignItems="center" >
              <Stack alignContent={"center"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                <TableTitleTypography>
                  {assetReserves !== null ? `Price in ${(assetReserves?.symbol)} ` : 'Loading ccy...'}
                </TableTitleTypography>
                <NumbersTypography>
                  {formatNumber(priceInStox, 2)}
                </NumbersTypography>
              </Stack>

            </Grid>

            <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
              <TextField
                size="small"
                label="Quantity"
                id="outlined-basic"
                defaultValue={0}
                
                sx={{
                  color:"white",
                  width: '10ch',
                  height: '35px', // Increase the height
                  '& .MuiOutlinedInput-root': {
                    height: '100%', // Ensure the input takes the full height of the TextField
                  },
                  '& .MuiOutlinedInput-input': {
                    color:"white",
                    padding: '10px 14px', // Adjust padding to vertically center the text
                    fontFamily: 'Michroma',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                  },
                  '& .MuiInputAdornment-root': {
                    height: '25px',
                    color:"white",
                  },
                }}
                //value={quantity}
                onChange={handleQuantityChange}
              />
            </Grid>

          </Grid>
          <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1} sx={{ marginTop: 1 }} >

            <Grid container size={6} justifyContent={'center'} >
              <BuyButton
                disabled={buyOrderIsPending || stoxApproveIsPending || sellOrderIsPending || nvidiaApproveIsPending || buyOrderIsConfirming || stoxApproveIsConfirming || sellOrderIsConfirming || nvidiaApproveIsConfirming}
                onClick={placeBuyOrder}
                color="success"
                variant="contained"
                size="small"
                sx={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                  textTransform: 'none',
                }}
              >
                {buyOrderIsPending || stoxApproveIsPending || sellOrderIsPending || nvidiaApproveIsPending || buyOrderIsConfirming || stoxApproveIsConfirming || sellOrderIsConfirming || nvidiaApproveIsConfirming ? 'Pending...' : <>
                  <ButtonTypography
                    color='white'
                  >BUY</ButtonTypography>
                </>}
              </BuyButton>
            </Grid>
            <Grid container size={6} justifyContent={'center'} >
              <SellButton
                disabled={buyOrderIsPending || stoxApproveIsPending || sellOrderIsPending || nvidiaApproveIsPending || buyOrderIsConfirming || stoxApproveIsConfirming || sellOrderIsConfirming || nvidiaApproveIsConfirming}
                onClick={placeSellOrder}
                color="error"
                variant="contained"
                size="small"
                sx={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f44336', // Red color for the button
                  '&:hover': {
                    backgroundColor: '#d32f2f', // Darker red color for hover state
                  },
                  textTransform: 'none',
                }}
              >
                {buyOrderIsPending || stoxApproveIsPending || sellOrderIsPending || nvidiaApproveIsPending || buyOrderIsConfirming || stoxApproveIsConfirming || sellOrderIsConfirming || nvidiaApproveIsConfirming ? 'Pending...' : <>
                  <ButtonTypography
                    color='white'
                  >SELL</ButtonTypography>
                </>}
              </SellButton>
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
  );
}
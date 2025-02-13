import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import AmountTextField from '../../assets/elements/CustomTextFields';
import SubSectionTitleTypography from '../../assets/elements/CustomTypography';
import { useApproveTokenTransfer, ApprovalConfig, useMintLiquidity, LiquidityMintingConfig } from '../liquidityPoolPricing/Operations';
import { mockUsdtContractConfig } from '../../assets/contracts/dev/MockUsdt';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { nonFongiblePoolManagerContractConfig } from '../../assets/contracts/dev/NonFongiblePoolManager';
import { ethers } from 'ethers';



import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAccount } from 'wagmi';

export default function LiquidityCreation() {

    const [usdtQuantity, setUsdtQuantity] = useState(0);
    const [stoxQuantity, setStoxQuantity] = useState(0);
    const [lowerTick, setLowerTick] = useState(0);
    const [upperTick, setUpperTick] = useState(0);
    const [usdtMinAmt, setUsdtMinAmt] = useState(0);
    const [stoxMinAmt, setStoxMinAmt] = useState(0);

    const [isApproving, setIsApproving] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const { approve, isLoading, isSuccess, isError, error } = useApproveTokenTransfer();

    const { mintLiquidity, isLoading: liquidityMintingLoading, isSuccess: liquidityMintingSuccess, isError: liquidityMintingIsError, error: liquidityMintingError } = useMintLiquidity();


    const [usdtTransferApproved, setUsdtTransferApproved] = useState(false);
    const [stoxTransferApproved, setStoxTransferApproved] = useState(false);

     const { address: connectedWalletAddress } = useAccount()

    const handleAddLiquidity = async () => {
        const usdtApprovalConfig: ApprovalConfig = {
            tokenAddress: mockUsdtContractConfig.address,
            tokenAbi: mockUsdtContractConfig.abi,
            spenderAddress: nonFongiblePoolManagerContractConfig.address,
            amount: "100",
            decimals: 6  // different decimal places
        };
        const stoxApprovalConfig: ApprovalConfig = {
            tokenAddress: stoxContractConfig.address,
            tokenAbi: stoxContractConfig.abi,
            spenderAddress: nonFongiblePoolManagerContractConfig.address,
            amount: "100",
            decimals: 18  // different decimal places
        };

        const liquidityMintingConfig: LiquidityMintingConfig = {
            nonFungiblePoolManagerAddress:  nonFongiblePoolManagerContractConfig.address,
            nonFungiblePoolManagerAbi:  nonFongiblePoolManagerContractConfig.abi,
            token0: mockUsdtContractConfig.address,
            token1: stoxContractConfig.address,
            fee: 500,
            tickLower: 299300,
            tickUpper: 299400,
            amount0Desired: ethers.parseUnits("10000", 6),
            amount1Desired: ethers.parseUnits("100000", 18), 
            amount0Min: 0,
            amount1Min: 0,
            recipient: String(connectedWalletAddress),
            deadline:  Math.floor(Date.now() / 1000) + 60 * 10


        };

        try {
            setIsMinting(true);
            await mintLiquidity(liquidityMintingConfig);
            console.log(`Liquidity Minting successful`);
        } catch (error) {
            console.error('Liquidity Minting failed:', error);
        } finally {
            setIsMinting(false);
        }

        /* try {
            setIsApproving(true);
            await approve(stoxApprovalConfig);
            console.log(`Approval successful for token: ${stoxApprovalConfig.tokenAddress}`);
        } catch (error) {
            console.error('Approval failed:', error);
        } finally {
            setIsApproving(false);
        }

        try {
            setIsApproving(true);
            await approve(usdtApprovalConfig);
            console.log(`Approval successful for token: ${usdtApprovalConfig.tokenAddress}`);

        } catch (error) {
            console.error('Approval failed:', error);
        } finally {
            setIsApproving(false);
        } */


    };



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
            <Grid container rowSpacing={2}>
                <Grid size={12} container justifyContent="center">
                    <Button
                        variant='contained'
                        onClick={() => handleAddLiquidity()}
                        disabled={isApproving || isLoading}
                    >
                        {isLoading ? 'Approving...' : 'Add Liquidity'}
                    </Button>
                </Grid>
            </Grid>
        </Stack>

    )
}
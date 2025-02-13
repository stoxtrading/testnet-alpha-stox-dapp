import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';

export interface ApprovalConfig {
    tokenAddress: string;
    tokenAbi: readonly unknown[];
    spenderAddress: string;
    amount: string;
    decimals?: number;
}

export interface LiquidityMintingConfig {
    nonFungiblePoolManagerAddress: string;
    nonFungiblePoolManagerAbi: readonly unknown[];
    token0: string;
    token1: string;
    fee: number;
    tickLower : number;
    tickUpper : number;
    amount0Desired: bigint;
    amount1Desired: bigint;
    amount0Min: number;
    amount1Min: number;
    recipient: string;
    deadline: number;
}

export const useMintLiquidity = () => {
    const { 
        writeContract,
        isPending: isLoading,
        isSuccess,
        isError,
        error
    } = useWriteContract();

    const mintLiquidity = async (config: LiquidityMintingConfig) => {
        const { nonFungiblePoolManagerAddress,
            nonFungiblePoolManagerAbi,
            token0,
            token1,
            fee,
            tickLower ,
            tickUpper,
            amount0Desired,
            amount1Desired,
            amount0Min,
            amount1Min,
            recipient,
            deadline } = config;
        
 

        try {
            // Make sure we have the 0x prefix
            const formattedAddressNonFungiblePoolManagerAddress = nonFungiblePoolManagerAddress.startsWith('0x') ? nonFungiblePoolManagerAddress : `0x${nonFungiblePoolManagerAddress}`;
            console.log('Calling writeContract with',{
                address: formattedAddressNonFungiblePoolManagerAddress as `0x${string}`,
                abi: nonFungiblePoolManagerAbi,
                functionName: 'mint',
                args: [token0,
                    token1,
                    fee,
                    tickLower ,
                    tickUpper,
                    amount0Desired,
                    amount1Desired,
                    amount0Min,
                    amount1Min,
                    recipient,
                    deadline] 
            })
            const response =  await writeContract({
                address: formattedAddressNonFungiblePoolManagerAddress as `0x${string}`,
                abi: nonFungiblePoolManagerAbi,
                functionName: 'mint',
                args: [[token0,
                    token1,
                    fee,
                    tickLower ,
                    tickUpper,
                    amount0Desired,
                    amount1Desired,
                    amount0Min,
                    amount1Min,
                    recipient,
                    deadline],],
            });

            console.log('Response from mintLiquidity:', response);

            return response;


        } catch (err) {
            console.error('Error in Liquidity Minting function:', err);
            throw err;
        }
    };

    return {
        mintLiquidity,
        isLoading,
        isSuccess,
        isError,
        error
    };
};


export const useApproveTokenTransfer = () => {
    const { 
        writeContract,
        isPending: isLoading,
        isSuccess,
        isError,
        error
    } = useWriteContract();

    const approve = async (config: ApprovalConfig) => {
        const { tokenAddress, tokenAbi, spenderAddress, amount, decimals = 18 } = config;
        
        console.log('Preparing approval with:', {
            tokenAddress,
            spenderAddress,
            amount,
            decimals
        });

        try {
            // Make sure we have the 0x prefix
            const formattedAddress = tokenAddress.startsWith('0x') ? tokenAddress : `0x${tokenAddress}`;
            const parsedAmount = parseUnits(amount, decimals);

            console.log('Calling writeContract with:', {
                address: formattedAddress,
                functionName: 'approve',
                args: [spenderAddress, parsedAmount]
            });

            return await writeContract({
                address: formattedAddress as `0x${string}`,
                abi: tokenAbi,
                functionName: 'approve',
                args: [spenderAddress, parsedAmount]
            });
        } catch (err) {
            console.error('Error in approve function:', err);
            throw err;
        }
    };

    return {
        approve,
        isLoading,
        isSuccess,
        isError,
        error
    };
};
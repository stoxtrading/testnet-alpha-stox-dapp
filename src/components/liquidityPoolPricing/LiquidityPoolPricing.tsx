import { ethers } from 'ethers';

// The ABIs we need
const POOL_ABI = [
    "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
    "function liquidity() external view returns (uint128)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)"
];

const ERC20_ABI = [
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)"
];



interface TokenInfo {
    address: string;
    symbol: string;
    reserve: string;
}

interface PoolReserves {
    token0: TokenInfo;
    token1: TokenInfo;
    poolAddress: string;
}

export default async function getPoolReserves(poolAddress: string): Promise<PoolReserves> {
    try {
        // Create contract instances
        const provider = new ethers.JsonRpcProvider(`${import.meta.env.VITE_APP_HTTP_RPC_ENDPOINT}`);
        const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);
        
        // Get token addresses
        const token0Address: string = await poolContract.token0();
        const token1Address: string = await poolContract.token1();
        
        const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, provider);
        const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, provider);
        //const token1Contract = await ethers.getContractAt(ERC20_ABI, token1Address);
        
        // Get token info
        const token0Decimals: number = await token0Contract.decimals();
        console.log("token0Decimals", token0Decimals);
        const token1Decimals: number = await token1Contract.decimals();
        console.log("token1Decimals", token1Decimals);
        const token0Symbol: string = await token0Contract.symbol();
        console.log("token0Symbol", token0Symbol);
        const token1Symbol: string = await token1Contract.symbol();
        console.log("token1Symbol", token1Symbol);
        
        // Get current liquidity and price
        const liquidity: bigint = await poolContract.liquidity();
        console.log("liquidity", liquidity);
        const slot0: [bigint, number, number, number, number, number, boolean] = await poolContract.slot0();
        console.log("slot0", slot0);
        const sqrtPriceX96: bigint = slot0[0];
        console.log("sqrtPriceX96", sqrtPriceX96);
        
        // Calculate reserves using sqrt price and liquidity
        const Q96 = BigInt(2) ** BigInt(96);  // Using BigInt instead of BigNumber

        console.log("Q96", Q96);
        //const sqrtPrice = sqrtPriceX96 / Q96;
        
        // Calculate reserves using Uniswap V3 formulas
        // Convert values to BigInt for calculations
        const liquidityBI = BigInt(liquidity.toString());
        const sqrtPriceX96BI = BigInt(sqrtPriceX96.toString());
        
        const token0Reserve = (liquidityBI * Q96) / sqrtPriceX96BI;
        const token1Reserve = (liquidityBI * sqrtPriceX96BI) / Q96;
        
        return {
            token0: {
                address: token0Address,
                symbol: token0Symbol,
                reserve: ethers.formatUnits(token0Reserve.toString(), token0Decimals),
            },
            token1: {
                address: token1Address,
                symbol: token1Symbol,
                reserve: ethers.formatUnits(token1Reserve.toString(), token1Decimals),
            },
            poolAddress
        };
    } catch (error) {
        console.error('Error getting pool reserves:', error);
        throw error;
    }
}

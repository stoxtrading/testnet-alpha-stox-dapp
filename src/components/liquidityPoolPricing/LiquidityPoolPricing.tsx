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

const FACTORY_ABI = [
    "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)"
];

interface PoolAddressParams {
    factoryAddress: string;
    token0Address: string;
    token1Address: string;
    fee: number;
}

async function getPoolAddress({ factoryAddress, token0Address, token1Address, fee }: PoolAddressParams): Promise<string> {
    
    const provider = new ethers.JsonRpcProvider('https://sepolia.unichain.org');

    const factory = new ethers.Contract(factoryAddress, FACTORY_ABI, provider);
    
    // Sort token addresses
    const [token0, token1] = token0Address.toLowerCase() < token1Address.toLowerCase() 
        ? [token0Address, token1Address] 
        : [token1Address, token0Address];
    
    const poolAddress = await factory.getPool(token0, token1, fee);
    
    if (poolAddress === "0x0000000000000000000000000000000000000000") {
        throw new Error("Pool does not exist");
    }
    
    return poolAddress;
}

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
        const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
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
/* 
export default async function GetReserves() {
    // Sepolia testnet addresses
    const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    
    // Replace these with your token addresses
    const token0Address = "0x31d0220469e10c4E71834a79b1f276d740d3768F";
    const token1Address = "0x8b5cD3355CfBC3864DdDf85d0660E0e53579aA61";
    const fee = 3000; // 0.3% fee tier
    let reserves = { token0: { address: '', symbol: '', reserve: '' }, token1: { address: '', symbol: '', reserve: '' }, poolAddress: '' };
    try {
        // First get the pool address
        const poolAddress = await getPoolAddress({ factoryAddress: FACTORY_ADDRESS, token0Address, token1Address, fee });
        console.log("Pool Address:", poolAddress);
        
        // Then get the reserves
        reserves = await getPoolReserves(poolAddress);
        console.log("\nPool Reserves:");
        console.log(`${reserves.token0.symbol}: ${reserves.token0.reserve}`);
        console.log(`${reserves.token1.symbol}: ${reserves.token1.reserve}`);
        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
    return {
        token0Reserve: reserves.token0,
        token1Reserve: reserves.token1,
    };
} */
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

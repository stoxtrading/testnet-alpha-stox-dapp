import {
    useWriteContract
} from 'wagmi'
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';

const ApproveSpending = (approvedAmount : bigint, contractConfig: typeof stoxContractConfig | typeof nvidiaContractConfig   ) => {
    const {
        data: approveHash,
        error: approveError,
        isPending: approveIsPending,
        writeContract: approveSpendingFunction
    } = useWriteContract()
    const approveSpending = async () => {
        try {
            const result = await approveSpendingFunction({
                address: contractConfig.address,
                abi: contractConfig.abi,
                functionName: 'approve',
                args: [nvidiaOrderBookContractConfig.address, approvedAmount],
            })
            console.log('Response Spending Approval:', result);
            return result;
        } catch (err) {
            console.error('Error in Liquidity Minting function:', err);
            throw err;
        }
    };

    return {
        approveSpending,
        approveHash,
        approveError,
        approveIsPending
    };
};

 const getApproveSpendingConfig = (approvedAmount: bigint, contractConfig: typeof stoxContractConfig | typeof nvidiaContractConfig) => {
    return {
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'approve',
        args: [nvidiaOrderBookContractConfig.address, approvedAmount],
    };
};

export {ApproveSpending, getApproveSpendingConfig}



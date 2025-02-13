import { ethers } from 'ethers';

interface ApproveTransferParams {
    tokenContractAddress: string;
    spenderAddress: string;
    amount: string;
    signer: ethers.Signer;
}

export const approveTransfer = async ({
    tokenContractAddress,
    spenderAddress,
    amount,
    signer,
}: ApproveTransferParams): Promise<ethers.ContractTransaction> => {
    const ERC20_ABI = [
        "function approve(address spender, uint256 amount) public returns (bool)"
    ];

    const tokenContract = new ethers.Contract(tokenContractAddress, ERC20_ABI, signer);

    try {
        const tx = await tokenContract.approve(spenderAddress, BigInt(amount));
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Approval failed:", error);
        throw error;
    }
};
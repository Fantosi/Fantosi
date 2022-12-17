import { network, ethers } from "hardhat";
import { BigNumber } from "ethers";

export const blockTimeStamp = async (): Promise<number> => {
    return (await ethers.provider.getBlock("latest")).timestamp;
};

export const setNextBlockTimestamp = async (timeStamp: number) => {
    return network.provider.send("evm_setNextBlockTimestamp", [timeStamp]);
};

export const passNSeconds = async (seconds: number): Promise<number> => {
    const blockTimeStampVars = await blockTimeStamp();
    const currentBlockTimeStamp = blockTimeStampVars + seconds;
    await setNextBlockTimestamp(currentBlockTimeStamp);
    await network.provider.send("hardhat_mine", [ethers.utils.hexValue(1)]);

    return currentBlockTimeStamp;
};

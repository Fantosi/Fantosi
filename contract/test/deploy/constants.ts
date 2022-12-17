import { ethers, BigNumber } from "ethers";

export const auctionInfo: {
    wBNBAddress: string;
    timeBuffer: BigNumber;
    reservePrice: BigNumber;
    minBidIncrementPercentage: BigNumber;
    totalDuration: BigNumber;
    finalDurationPoint: BigNumber;
} = {
    wBNBAddress: "0x0",
    timeBuffer: BigNumber.from(300), // 5 min
    reservePrice: ethers.utils.parseEther("0.01"), // 0.01 BNB
    minBidIncrementPercentage: BigNumber.from(5), // 5%
    totalDuration: BigNumber.from(86400), // 1 day
    finalDurationPoint: BigNumber.from(86100), // after 23 hours and 55 min, only in test case
};

export const governanceInfo: {
    timeLockDelay: BigNumber;
    proposalThresholdBPS: BigNumber;
    quorumVotesBPS: BigNumber;
    votingPeriod: BigNumber;
    votingDelay: BigNumber;
} = {
    timeLockDelay: BigNumber.from(172800), // 2 days
    proposalThresholdBPS: BigNumber.from(500), // 5%
    quorumVotesBPS: BigNumber.from(1000), // 10%
    votingPeriod: BigNumber.from(5760), // About 24 hours with 15s blocks
    votingDelay: BigNumber.from(1), // 1 block
};

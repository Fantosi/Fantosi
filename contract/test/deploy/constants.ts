import { ethers, BigNumber } from "ethers";

export const auctionInfoTest: {
    wBNBAddress: string;
    timeBuffer: BigNumber;
    reservePrice: BigNumber;
    minBidIncrementPercentage: BigNumber;
    initialStartTime: BigNumber;
    totalDuration: BigNumber;
    finalDurationPoint: BigNumber;
} = {
    wBNBAddress: "0x0",
    timeBuffer: BigNumber.from(300), // 5 min
    reservePrice: ethers.utils.parseEther("0.01"), // 0.01 BNB
    minBidIncrementPercentage: BigNumber.from(5), // 5%
    initialStartTime: BigNumber.from(0), // 0으로 되어 있을 시, 현재 시간
    totalDuration: BigNumber.from(86400), // 1 day
    finalDurationPoint: BigNumber.from(86100), // after 23 hours and 55 min, only in test case
};

export const governanceInfoTest: {
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

export const photoCardInfoTest: {
    [artist: string]: {
        name: string;
        symbol: string;
        contractURIHash: string;
    };
} = {
    NEWJEANS: {
        name: "NEWJEANS PHOTOCARD",
        symbol: "NEWJEANS",
        contractURIHash:
            "https://jade-deliberate-partridge-706.mypinata.cloud/ipfs/QmYPbjNtDWF1H6BBrzujWKsJ8gzeBNX9Z81NhFg7bvkAHM/",
    },
};

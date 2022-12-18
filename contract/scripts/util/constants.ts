import { ethers, BigNumber } from "ethers";

export const auctionInfo: {
    wBNBAddress: string;
    timeBuffer: BigNumber;
    reservePrice: BigNumber;
    minBidIncrementPercentage: BigNumber;
    initialStartTime: BigNumber;
    totalDuration: BigNumber;
    finalDurationPoint: BigNumber;
} = {
    wBNBAddress: "0x0",
    timeBuffer: BigNumber.from(60), // 1 min
    reservePrice: ethers.utils.parseEther("0.00001"), // 0.00001 BNB
    minBidIncrementPercentage: BigNumber.from(5), // 5%
    initialStartTime: BigNumber.from(0), // 0으로 되어 있을 시, 현재 시간
    totalDuration: BigNumber.from(3600), // 1 hour
    finalDurationPoint: BigNumber.from(3000), // 50 min
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

export const photoCardInfo: {
    [artist: string]: {
        address: string;
        name: string;
        symbol: string;
        contractURIHash: string;
    };
} = {
    NEWJEANS: {
        address: "0x3A6528E50DB65Ac99555DD45C16a14853Db0F48a",
        name: "NEWJEANS PHOTOCARD",
        symbol: "NEWJEANS",
        contractURIHash:
            "https://jade-deliberate-partridge-706.mypinata.cloud/ipfs/QmZMcGX66GVaMFwHSH6J5m6yb2SdPokXT8p8SakrAg5V8f/",
    },
};

export const testnetWBNBAddr = "0x5B3E2Bc1da86ff6235D9eAd4504d598caE77DBCB";

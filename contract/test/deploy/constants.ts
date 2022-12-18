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
    dynamicQuorum: {
        minQuorumVotesBPS: BigNumber;
        maxQuorumVotesBPS: BigNumber;
        quorumCoefficient: BigNumber;
    };
    votingPeriod: BigNumber;
    votingDelay: BigNumber;
} = {
    timeLockDelay: BigNumber.from(172800), // 2 days, for unix time
    proposalThresholdBPS: BigNumber.from(500), // 5%
    dynamicQuorum: {
        minQuorumVotesBPS: BigNumber.from(1000), // 10.00%
        maxQuorumVotesBPS: BigNumber.from(2000), // 20.00%
        quorumCoefficient: BigNumber.from(1),
    },
    votingPeriod: BigNumber.from(28800), // About 24 hours with 3s blocks
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

export const encodeParameters = (types: string[], values: unknown[]): string => {
    const abi = new ethers.utils.AbiCoder();
    return abi.encode(types, values);
};

export const exampleSenderAddress = "0x0934D78959e4b25C7A263aCAe02077b277d57771";
export const exampleSenderAmount = ethers.utils.parseEther("0.00001");

export const proposalExampleTest: {
    targets: string[];
    values: string[];
    signatures: string[];
    calldatas: string[];
    description: string;
} = {
    targets: [exampleSenderAddress],
    values: ["0"],
    signatures: ["transfer(address,uint256)"],
    calldatas: [encodeParameters(["address", "uint256"], [exampleSenderAddress, exampleSenderAmount])],
    description: "뉴진스한테 돈주기 가보자고-!",
};

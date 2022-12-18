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
    timeBuffer: BigNumber.from(10), // 10 second
    reservePrice: ethers.utils.parseEther("0.000001"), // 0.000001 BNB
    minBidIncrementPercentage: BigNumber.from(5), // 5%
    initialStartTime: BigNumber.from(0), // 0으로 되어 있을 시, 현재 시간
    totalDuration: BigNumber.from(600), // 10 minute
    finalDurationPoint: BigNumber.from(540), // 9 minute
};

export const governanceInfo: {
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

export const encodeParameters = (types: string[], values: unknown[]): string => {
    const abi = new ethers.utils.AbiCoder();
    return abi.encode(types, values);
};

export const exampleSenderAddress = "0x0934D78959e4b25C7A263aCAe02077b277d57771";
export const exampleSenderAmount = ethers.utils.parseEther("0.00001");

export const proposalExample: {
    targets: string[];
    sendValues: BigNumber[];
    signatures: string[];
    calldatas: string[];
    description: string;
} = {
    targets: [exampleSenderAddress],
    sendValues: [ethers.utils.parseEther("0.00001")],
    signatures: ["transfer(address,uint256)"],
    calldatas: [encodeParameters(["address", "uint256"], [exampleSenderAddress, exampleSenderAmount])],
    description: "tvn 방송 [유퀴즈 온더 블럭] 뉴진스 출연 밥차 조공",
};

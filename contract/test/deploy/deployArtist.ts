import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { FantosiAuctionHouse, FantosiDAOExecutor, FantosiToken, FantosiView, WBNB } from "../../typechain";
import { auctionInfoTest, governanceInfoTest } from "./constants";

export interface DeployParams {
    name: string;
    symbol: string;
    contractURIHash: string;
    admin: SignerWithAddress;
    artist: SignerWithAddress;
}

export interface RT {
    fantosiToken: FantosiToken;
    fantosiAuctionHouse: FantosiAuctionHouse;
    fantosiDAOExecutor: FantosiDAOExecutor;
    fantosiView: FantosiView;
}

// 배포 순서 참고
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/test/end2end.test.ts

export const deployArtist = async (params: DeployParams): Promise<RT> => {
    /// 테스트용 토큰: 실제 환경에서는 이미 배포되어 있음
    const WBNBContract = await ethers.getContractFactory("WBNB");
    const wBNB = (await WBNBContract.deploy()) as WBNB;

    /// View 컨트랙트 배포
    const FantosiViewContract = await ethers.getContractFactory("FantosiView");
    const fantosiView = (await upgrades.deployProxy(FantosiViewContract, [])) as FantosiView;
    await fantosiView.deployed();

    /// Fantosi DAO Executor 배포
    /* Gov Delegator Address 계산 */
    const calculatedGovDelegatorAddress = ethers.utils.getContractAddress({
        from: params.admin.address,
        nonce: (await params.admin.getTransactionCount()) + 2,
    });

    /* Executor(Treasury) 컨트랙트 배포 */
    const FantosiDAOExecutorContract = await ethers.getContractFactory("FantosiDAOExecutor");
    const fantosiDAOExecutor = (await FantosiDAOExecutorContract.deploy(
        calculatedGovDelegatorAddress,
        governanceInfoTest.timeLockDelay,
        {
            gasLimit: "30000000",
        },
    )) as FantosiDAOExecutor;
    await fantosiDAOExecutor.deployed();

    /// Fantosi Token 컨트랙트 배포
    const FantosiTokenContract = await ethers.getContractFactory("FantosiToken");
    const fantosiToken = (await FantosiTokenContract.deploy(
        params.admin.address,
        params.artist.address,
        params.name,
        params.symbol,
        params.contractURIHash,
    )) as FantosiToken;
    await fantosiToken.deployed();

    // View 컨트랙트에 저장
    await fantosiView.connect(params.admin).setFantosiTokenAddress(params.symbol, fantosiToken.address);

    /// Fantosi Auction 컨트랙트 배포
    const FantosiAuctionHouseContract = await ethers.getContractFactory("FantosiAuctionHouse");
    const fantosiAuctionHouse = (await upgrades.deployProxy(FantosiAuctionHouseContract, [
        fantosiToken.address,
        wBNB.address,
        auctionInfoTest.timeBuffer,
        auctionInfoTest.reservePrice,
        auctionInfoTest.minBidIncrementPercentage,
        auctionInfoTest.totalDuration,
        auctionInfoTest.finalDurationPoint,
        fantosiDAOExecutor.address,
    ])) as FantosiAuctionHouse;
    await fantosiAuctionHouse.deployed();

    // View 컨트랙트에 저장
    await fantosiView
        .connect(params.admin)
        .setFantosiTokenAuctionHouse(fantosiToken.address, fantosiAuctionHouse.address);

    /// 포토카드 Minter 설정
    await fantosiToken.connect(params.admin).setMinter(fantosiAuctionHouse.address);

    // TODO: DAO 배포 스크립트 추가

    /// AuctionHouse 정지 해제 => Daily Auction 시작
    // TODO: 컨트랙에 특정 시간에 시작하도록 설정하는 로직 추가
    await fantosiAuctionHouse.connect(params.admin).unpause();

    /// DAO Treasury로 Ownership 이동
    // await fantosiAuctionHouse.connect(params.admin).transferOwnership(fantosiDAOExecutor.address);

    return {
        fantosiToken,
        fantosiAuctionHouse,
        fantosiDAOExecutor,
        fantosiView,
    };
};

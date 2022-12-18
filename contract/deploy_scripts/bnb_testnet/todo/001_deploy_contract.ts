import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { wallet } from "../../../scripts/util/provider";
import { FantosiAuctionHouse, FantosiToken, FantosiView } from "../../../typechain";
import { auctionInfo, governanceInfo, photoCardInfo, testnetWBNBAddr } from "../../../scripts/util/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    /// View 컨트랙트 배포
    const FantosiView = await deploy("FantosiView", {
        from: deployer,
        proxy: {
            execute: {
                init: {
                    methodName: "initialize",
                    args: [],
                },
            },
        },
        log: true,
        autoMine: true,
    });

    const fantosiView = (await ethers.getContractAt(FantosiView.abi, FantosiView.address)).connect(
        wallet,
    ) as FantosiView;

    console.log("FantosiView 배포 완료 🚀: ", FantosiView.address);

    // TODO: 로직 파악 전까지는 admin으로 사용
    // const calculatedGovDelegatorAddress = ethers.utils.getContractAddress({
    //     from: wallet.address,
    //     nonce: (await wallet.getTransactionCount()) + 2,
    // });

    /// Fantosi DAO Executor 컨트랙트 배포
    const FantosiDAOExecutor = await deploy("FantosiDAOExecutor", {
        from: deployer,
        args: [wallet.address, governanceInfo.timeLockDelay],
        log: true,
        autoMine: true,
    });
    console.log("FantosiDAOExecutor 배포 완료 🚀: ", FantosiDAOExecutor.address);

    /// Fantosi Token 컨트랙트 배포
    const FantosiToken = await deploy("FantosiToken", {
        from: deployer,
        args: [
            wallet.address,
            photoCardInfo.NEWJEANS.address,
            photoCardInfo.NEWJEANS.name,
            photoCardInfo.NEWJEANS.symbol,
            photoCardInfo.NEWJEANS.contractURIHash,
        ],
        log: true,
        autoMine: true,
    });
    console.log("FantosiToken 배포 완료 🚀: ", FantosiToken.address);

    const fantosiToken = (await ethers.getContractAt(FantosiToken.abi, FantosiToken.address)).connect(
        wallet,
    ) as FantosiToken;

    /// View 컨트랙트에 저장
    await (
        await fantosiView.connect(wallet).setFantosiTokenAddress(photoCardInfo.NEWJEANS.symbol, FantosiToken.address)
    ).wait();

    console.log("View 컨트랙트 입력 완료 😻");

    /// Fantosi Auction 컨트랙트 배포
    const FantosiAuctionHouse = await deploy("FantosiAuctionHouse", {
        from: deployer,
        proxy: {
            execute: {
                init: {
                    methodName: "initialize",
                    args: [
                        FantosiToken.address,
                        testnetWBNBAddr,
                        auctionInfo.timeBuffer,
                        auctionInfo.reservePrice,
                        auctionInfo.minBidIncrementPercentage,
                        auctionInfo.initialStartTime,
                        auctionInfo.totalDuration,
                        auctionInfo.finalDurationPoint,
                        FantosiDAOExecutor.address,
                    ],
                },
            },
        },
        skipIfAlreadyDeployed: true,
        log: true,
        autoMine: true,
    });

    const fantosiAuctionHouse = (
        await ethers.getContractAt(FantosiAuctionHouse.abi, FantosiAuctionHouse.address)
    ).connect(wallet) as FantosiAuctionHouse;

    console.log("FantosiAuctionHouse 배포 완료 🚀: ", FantosiAuctionHouse.address);

    /// View 컨트랙트에 저장
    await (
        await fantosiView.connect(wallet).setFantosiTokenAuctionHouse(FantosiToken.address, FantosiAuctionHouse.address)
    ).wait();
    console.log("View 컨트랙트 입력 완료 😻");

    /// 포토카드 Minter 설정
    await (await fantosiToken.connect(wallet).setMinter(FantosiAuctionHouse.address)).wait();
    console.log("포토카드 Minter 설정 완료 😻");

    /// Fantosi Token 컨트랙트 배포
    const FantosiDAOLogic = await deploy("FantosiDAOLogic", {
        from: deployer,
        args: [
            FantosiDAOExecutor.address,
            fantosiToken.address,
            photoCardInfo.NEWJEANS.address, // Artist is Vetoer
            FantosiDAOExecutor.address,
            governanceInfo.votingPeriod,
            governanceInfo.votingDelay,
            governanceInfo.proposalThresholdBPS,
            governanceInfo.dynamicQuorum,
        ],
        log: true,
        autoMine: true,
    });
    console.log("FantosiDAOLogic 배포 완료 🚀: ", FantosiDAOLogic.address);

    // View 컨트랙트에 저장
    await (
        await fantosiView.connect(wallet).setFantosiDAOLogic(photoCardInfo.NEWJEANS.symbol, FantosiDAOLogic.address)
    ).wait();

    /// DAO Treasury로 Ownership 이동
    // await (await fantosiAuctionHouse.connect(wallet).transferOwnership(FantosiDAOExecutor.address)).wait();

    /// AuctionHouse 정지 해제 => 지정된 시간에 Daily Auction 시작
    await (await fantosiAuctionHouse.connect(wallet).unpause()).wait();
};

export default func;

func.tags = ["deploy_contract"];

import { FantosiAuctionHouse, FantosiDAOExecutor, FantosiDAOLogic, FantosiDAOProxy, FantosiToken } from "../typechain";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployArtist, DeployParams } from "./deploy/deployArtist";
import { auctionInfoTest, photoCardInfoTest, proposalExampleTest } from "./deploy/constants";
import { blockTimeStamp, passNSeconds } from "./util/hardhat.util";

describe.only("Fantosi Community Vote 테스트", () => {
    let admin: SignerWithAddress;
    let newjeans: SignerWithAddress;
    let user: SignerWithAddress[];
    let fantosiToken: FantosiToken;
    let fantosiAuctionHouse: FantosiAuctionHouse;
    let fantosiDAOExecutor: FantosiDAOExecutor;
    let fantosiDAOProxy: FantosiDAOProxy;
    let fantosiDAOLogic: FantosiDAOLogic;

    // Initial deployment function
    const deployAllArtists = async () => {
        // Newjeans
        const newjeansParams: DeployParams = {
            name: photoCardInfoTest.NEWJEANS.name,
            symbol: photoCardInfoTest.NEWJEANS.symbol,
            contractURIHash: photoCardInfoTest.NEWJEANS.contractURIHash,
            admin: admin,
            artist: newjeans,
        };

        const newjeansDeployed = await deployArtist(newjeansParams);

        ({ fantosiToken, fantosiAuctionHouse, fantosiDAOExecutor, fantosiDAOLogic, fantosiDAOProxy } =
            newjeansDeployed);
    };

    beforeEach(async () => {
        [admin, newjeans, ...user] = await ethers.getSigners();

        /* 모든 컨트랙트 배포 */
        await deployAllArtists();

        /* 1 BNB로 user0가 입찰 */
        const user0BidAmount = ethers.utils.parseEther("1");
        await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0BidAmount });

        /* 24시간 경과 */
        await passNSeconds(auctionInfoTest.totalDuration.toNumber() - 1);

        /* Settlement 진행 */
        await fantosiAuctionHouse.connect(admin).settleCurrentAndCreateNewAuction();

        /// 1개의 photocard를 user0이 보유
    });

    // Encoding 관련: https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/test/utils.ts
    it("테스트: 포토카드 보유 유저가 Proposal 제출이 가능한가?", async () => {
        console.log("얘랑 같아야함.", fantosiDAOLogic.address);
        await fantosiDAOLogic
            .connect(user[0])
            .propose(
                proposalExampleTest.targets,
                proposalExampleTest.values,
                proposalExampleTest.signatures,
                proposalExampleTest.calldatas,
                proposalExampleTest.description,
            );
    });
});

import { FantosiAuctionHouse, FantosiDAOExecutor, FantosiToken, FantosiView } from "../typechain";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployArtist, DeployParams } from "./deploy/deployArtist";
import { auctionInfo, photoCardInfo } from "./deploy/constants";
import { blockTimeStamp, passNSeconds } from "./util/hardhat.util";

describe.only("View 테스트", () => {
    let admin: SignerWithAddress;
    let newjeans: SignerWithAddress;
    let user: SignerWithAddress[];
    let fantosiToken: FantosiToken;
    let fantosiAuctionHouse: FantosiAuctionHouse;
    let fantosiDAOExecutor: FantosiDAOExecutor;
    let fantosiView: FantosiView;

    // Initial deployment function
    const deployAllArtists = async () => {
        // Newjeans
        const newjeansParams: DeployParams = {
            name: "NEWJEANS PHOTOCARD",
            symbol: "NEWJEANS",
            contractURIHash: "QmWJUHeeSYUQMyX695ntnjUzh3MY3tT6PBCWxhM8ngVP6n",
            admin: admin,
            artist: newjeans,
        };

        const newjeansDeployed = await deployArtist(newjeansParams);

        ({ fantosiToken, fantosiAuctionHouse, fantosiDAOExecutor, fantosiView } = newjeansDeployed);
    };

    beforeEach(async () => {
        [admin, newjeans, ...user] = await ethers.getSigners();

        /* 모든 컨트랙트 배포 */
        await deployAllArtists();

        /* 1 BNB로 user0가 입찰 */
        const user0BidAmount = ethers.utils.parseEther("1");
        await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0BidAmount });
    });

    it("테스트: getArtistPhotoCardInfo 테스트", async () => {
        const data = await fantosiView.getArtistPhotoCardInfo(photoCardInfo.NEWJEANS.symbol);
        console.log("metadataURI: ", data.metadataURI);
        console.log("photoCardId: ", data.currentAuction.photoCardId.toString());
        console.log("amount: ", data.currentAuction.amount.toString());
        console.log("startTime: ", data.currentAuction.startTime.toString());
        console.log("finalAuctionTime: ", data.currentAuction.finalAuctionTime.toString());
        console.log("endTime: ", data.currentAuction.endTime.toString());
        console.log("bidder: ", data.currentAuction.bidder);
        console.log("isFinalBid: ", data.currentAuction.isFinalBid);
        console.log("settled: ", data.currentAuction.settled);
    });

    it("테스트: getAllPhotoCardInfo 테스트", async () => {
        const data = await fantosiView.getAllPhotoCardInfo();
        console.log("metadataURI: ", data[0].metadataURI);
        console.log("photoCardId: ", data[0].currentAuction.photoCardId.toString());
        console.log("amount: ", data[0].currentAuction.amount.toString());
        console.log("startTime: ", data[0].currentAuction.startTime.toString());
        console.log("finalAuctionTime: ", data[0].currentAuction.finalAuctionTime.toString());
        console.log("endTime: ", data[0].currentAuction.endTime.toString());
        console.log("bidder: ", data[0].currentAuction.bidder);
        console.log("isFinalBid: ", data[0].currentAuction.isFinalBid);
        console.log("settled: ", data[0].currentAuction.settled);
    });

    it("테스트: getArtistPhotoCardHistoryInfo 테스트", async () => {
        /* 24시간 경과 */
        await passNSeconds(auctionInfo.totalDuration.toNumber() - 1);

        /* Settlement 진행 */
        await fantosiAuctionHouse.connect(admin).settleCurrentAndCreateNewAuction();

        /* 2 BNB로 user1가 입찰 */
        const user1BidAmount = ethers.utils.parseEther("2");
        await fantosiAuctionHouse.connect(user[1]).createBid(BigNumber.from(2), { value: user1BidAmount });

        /* 24시간 경과 */
        await passNSeconds(auctionInfo.totalDuration.toNumber() - 1);

        /* Settlement 진행 */
        await fantosiAuctionHouse.connect(admin).settleCurrentAndCreateNewAuction();

        /* 1.3 BNB로 user2 입찰 */
        const user2BidAmount = ethers.utils.parseEther("1.3");
        await fantosiAuctionHouse.connect(user[2]).createBid(BigNumber.from(3), { value: user2BidAmount });

        const data = await fantosiView.getArtistPhotoCardHistoryInfo(photoCardInfo.NEWJEANS.symbol);

        for (let i = 0; i < data.length; i++) {
            console.log(`======= ${i + 1}번째 포토카드 🧚🏻‍♀️ =======`);
            console.log("metadataURI: ", data[i].metadataURI);
            console.log("photoCardId: ", data[i].currentAuction.photoCardId.toString());
            console.log("amount: ", data[i].currentAuction.amount.toString());
            console.log("startTime: ", data[i].currentAuction.startTime.toString());
            console.log("finalAuctionTime: ", data[i].currentAuction.finalAuctionTime.toString());
            console.log("endTime: ", data[i].currentAuction.endTime.toString());
            console.log("bidder: ", data[i].currentAuction.bidder);
            console.log("isFinalBid: ", data[i].currentAuction.isFinalBid);
            console.log("settled: ", data[i].currentAuction.settled);
        }
    });

    it.only("테스트: getAllArtistInfo 테스트", async () => {
        const data = await fantosiView.getAllArtistInfo();
        console.log(data);
    });
});

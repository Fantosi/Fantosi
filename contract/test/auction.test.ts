import { FantosiAuctionHouse, FantosiDAOExecutor, FantosiToken } from "../typechain";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployArtist, DeployParams } from "./deploy/deployArtist";
import { auctionInfo, photoCardInfo } from "./deploy/constants";
import { blockTimeStamp, passNSeconds } from "./util/hardhat.util";

describe("Daily Auction 테스트", () => {
    let admin: SignerWithAddress;
    let newjeans: SignerWithAddress;
    let user: SignerWithAddress[];
    let fantosiToken: FantosiToken;
    let fantosiAuctionHouse: FantosiAuctionHouse;
    let fantosiDAOExecutor: FantosiDAOExecutor;

    // Initial deployment function
    const deployAllArtists = async () => {
        // Newjeans
        const newjeansParams: DeployParams = {
            name: photoCardInfo.NEWJEANS.name,
            symbol: photoCardInfo.NEWJEANS.symbol,
            contractURIHash: photoCardInfo.NEWJEANS.contractURIHash,
            admin: admin,
            artist: newjeans,
        };

        const newjeansDeployed = await deployArtist(newjeansParams);

        ({ fantosiToken, fantosiAuctionHouse, fantosiDAOExecutor } = newjeansDeployed);
    };

    beforeEach(async () => {
        [admin, newjeans, ...user] = await ethers.getSigners();

        /* 모든 컨트랙트 배포 */
        await deployAllArtists();
    });

    it("테스트: 최초 Settlement 상태 확인", async () => {
        /* 경매가 24시간동안 진행되는지 확인 */
        const auction = await fantosiAuctionHouse.auction();
        const duration = auction.endTime.sub(auction.startTime);

        expect(duration).to.equal(BigNumber.from(auctionInfo.totalDuration));
    });

    it("테스트: 입찰 시도 로직이 정상적으로 작동하는가?", async () => {
        /* 최초 Settlement 이후 포토카드 넘버 확인(1). */
        const photocardNum = (await fantosiAuctionHouse.auction()).photoCardId;
        expect(photocardNum).to.equal(BigNumber.from(1));

        /* 1 BNB로 최초 입찰 시도 */
        const user0BidAmount = ethers.utils.parseEther("1");
        await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0BidAmount });

        expect((await fantosiAuctionHouse.auction()).amount).to.equal(user0BidAmount);
        expect((await fantosiAuctionHouse.auction()).bidder).to.equal(user[0].address);

        /* 0.5 BNB로 추가 입찰 시도 => 실패해야 한다. (5% 이상로 입찰가 제시해야 함)*/
        const user1BidAmount = ethers.utils.parseEther("0.5");
        await expect(
            fantosiAuctionHouse.connect(user[1]).createBid(BigNumber.from(1), { value: user1BidAmount }),
        ).to.be.revertedWith("FANTOSI: INCREMENT_AMOUNT_ERROR");

        /* 1.05 BNB로 추가 입찰 시도 */
        const user1NewBidAmount = ethers.utils.parseEther("1.05");
        const user0BalanceBeforeBid = await user[0].getBalance();
        await fantosiAuctionHouse.connect(user[1]).createBid(BigNumber.from(1), { value: user1NewBidAmount });

        expect((await fantosiAuctionHouse.auction()).amount).to.equal(user1NewBidAmount);
        expect((await fantosiAuctionHouse.auction()).bidder).to.equal(user[1].address);

        /* 새로운 입찰 성공 시 기존 입찰자에 대한 환급이 이루어져야 한다. */
        const user0BalanceAfterBid = await user[0].getBalance();
        expect(user0BalanceAfterBid.sub(user0BalanceBeforeBid)).to.equal(user0BidAmount);
    });

    describe("연장 입찰 테스트", () => {
        beforeEach(async () => {
            /* 1 BNB로 user0가 입찰 */
            const user0BidAmount = ethers.utils.parseEther("1");
            await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0BidAmount });

            /* 23시간 53분 경과 */
            await passNSeconds(auctionInfo.finalDurationPoint.toNumber() - 120 - 1);

            /* 1.05 BNB로 user1가 입찰 */
            const user1BidAmount = ethers.utils.parseEther("1.05");
            await fantosiAuctionHouse.connect(user[1]).createBid(BigNumber.from(1), { value: user1BidAmount });
        });

        it("테스트: 연장 입찰 후 추가 입찰이 없을 시 정상적으로 종료되는가?", async () => {
            /* 5분 경과 */
            await passNSeconds(300);

            /* 경매가 종료되었으므로 user2의 입찰 시도가 실패해야 함 */
            const user2BidAmount = ethers.utils.parseEther("1.5");
            await expect(
                fantosiAuctionHouse.connect(user[2]).createBid(BigNumber.from(1), { value: user2BidAmount }),
            ).to.be.revertedWith("FANTOSI: EXPIRED_AUCTION_ERROR");
        });

        it("테스트: 연장 입찰 시도 로직이 정상적으로 작동하는가?", async () => {
            /* 연장 입찰이 작동해야 함 */
            expect((await fantosiAuctionHouse.auction()).isFinalBid).to.equal(true);

            /* 4분 경과 */
            await passNSeconds(240 - 1);

            /* 1.2 BNB로 user0가 재입찰 */
            const user0NewBidAmount = ethers.utils.parseEther("1.2");
            await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0NewBidAmount });

            /* 4분 경과 */
            await passNSeconds(240 - 1);

            /* endtime이 경과하였으므로 user1의 재입찰 시도가 실패해야 함 */
            const user1NewBidAmount = ethers.utils.parseEther("1.4");
            await expect(
                fantosiAuctionHouse.connect(user[1]).createBid(BigNumber.from(1), { value: user1NewBidAmount }),
            ).to.be.revertedWith("FANTOSI: EXPIRED_AUCTION_ERROR");
        });
    });

    it("테스트: 입찰 종료 후 Settlement가 정상적으로 이루어지는가?", async () => {
        const prevAuction = await fantosiAuctionHouse.auction();

        /* 1 BNB로 user0가 입찰 */
        const user0BidAmount = ethers.utils.parseEther("1");
        await fantosiAuctionHouse.connect(user[0]).createBid(BigNumber.from(1), { value: user0BidAmount });

        /* 24시간 경과 */
        await passNSeconds(auctionInfo.totalDuration.toNumber() - 1);

        /* Settlement 진행 */
        await fantosiAuctionHouse.connect(admin).settleCurrentAndCreateNewAuction();

        /// Settlement 이후 상태 확인
        /* 입찰자에게 포토카드가 지급되었는지 확인 */
        expect(await fantosiToken.ownerOf(BigNumber.from(1))).to.equal(user[0].address);

        /* Treasury에 입찰금이 전달되었는지 확인 */
        expect(await ethers.provider.getBalance(fantosiDAOExecutor.address)).to.equal(user0BidAmount);

        /* Settlement 이후 새로운 auction state 확인 */
        const newAuction = await fantosiAuctionHouse.auction();

        expect(newAuction.photoCardId).to.equal(BigNumber.from(2));
        expect(newAuction.startTime).to.equal(prevAuction.endTime);
        expect(newAuction.finalAuctionTime).to.equal(prevAuction.endTime.add(auctionInfo.finalDurationPoint));
        expect(newAuction.endTime).to.equal(prevAuction.endTime.add(auctionInfo.totalDuration));
        expect(newAuction.amount).to.equal(BigNumber.from(0));
    });
});

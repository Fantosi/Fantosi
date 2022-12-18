import { FantosiAuctionHouse, FantosiDAOExecutor, FantosiDAOLogic, FantosiToken, FantosiView } from "../typechain";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployArtist, DeployParams } from "./deploy/deployArtist";
import { auctionInfoTest, photoCardInfoTest, proposalExampleTest } from "./deploy/constants";
import { blockTimeStamp, passNSeconds } from "./util/hardhat.util";
import { governanceInfoTest } from "./deploy/constants";

describe("Fantosi Community Vote 테스트", () => {
    let admin: SignerWithAddress;
    let newjeans: SignerWithAddress;
    let user: SignerWithAddress[];
    let fantosiToken: FantosiToken;
    let fantosiAuctionHouse: FantosiAuctionHouse;
    let fantosiDAOExecutor: FantosiDAOExecutor;
    let fantosiDAOLogic: FantosiDAOLogic;
    let fantosiView: FantosiView;

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

        ({ fantosiToken, fantosiAuctionHouse, fantosiDAOExecutor, fantosiDAOLogic, fantosiView } = newjeansDeployed);
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
        /* user0가 proposal 실행 */
        await fantosiDAOLogic
            .connect(user[0])
            .propose(
                proposalExampleTest.targets,
                proposalExampleTest.sendValues,
                proposalExampleTest.signatures,
                proposalExampleTest.calldatas,
                proposalExampleTest.description,
            );

        /* proposal state 값 확인 */
        const initialProposalState = await fantosiDAOLogic.proposals(BigNumber.from(1));

        expect(initialProposalState.id).to.equal(BigNumber.from(1));
        expect(initialProposalState.proposer).to.equal(user[0].address);
        expect(initialProposalState.targets[0]).to.equal(proposalExampleTest.targets[0]);
        expect(initialProposalState.sendValues[0]).to.equal(proposalExampleTest.sendValues[0]);
        expect(initialProposalState.description).to.equal(proposalExampleTest.description);
        expect(initialProposalState.startBlock).to.equal((await ethers.provider.getBlockNumber()) + 1);
        expect(initialProposalState.endBlock).to.equal(
            initialProposalState.startBlock.add(governanceInfoTest.votingPeriod),
        );
        expect(initialProposalState.state).to.equal("Pending");

        /* Pending 대기 */
        await passNSeconds(1);

        /* user1이 찬성 투표 실행 */
        await fantosiDAOLogic.connect(user[0]).castVote(BigNumber.from(1), BigNumber.from(1));

        /* proposal state 값 확인 */
        const firstProposal = await fantosiDAOLogic.proposals(BigNumber.from(1));
        expect(firstProposal.forVotes).to.equal(BigNumber.from(1));

        /* view 컨트랙트 테스트 */
        const data = await fantosiView.getArtistAllProposalInfo(photoCardInfoTest.NEWJEANS.symbol);
        console.log(data[0]);
    });
});

import { provider, wallet } from "../util/provider";
import { ethers } from "ethers";
import { contracts as bnbContracts } from "../../deployments/bnb_testnet.json";
import { FantosiAuctionHouse, FantosiDAOLogic, FantosiView } from "../../typechain";
import { unixToTimeString } from "../util/date";
import { photoCardInfo, proposalExample } from "../util/constants";

// Bid Amount
const bidAmount = ethers.utils.parseEther("0.0001");

export const bid = async () => {
    const fantosiDAOLogic = new ethers.Contract(
        bnbContracts.FantosiDAOLogic.address,
        bnbContracts.FantosiDAOLogic.abi,
        provider,
    ) as FantosiDAOLogic;

    const fantosiView = new ethers.Contract(
        bnbContracts.FantosiView.address,
        bnbContracts.FantosiView.abi,
        provider,
    ) as FantosiView;

    // await (
    //     await fantosiDAOLogic
    //         .connect(wallet)
    //         .propose(
    //             proposalExample.targets,
    //             proposalExample.sendValues,
    //             proposalExample.signatures,
    //             proposalExample.calldatas,
    //             proposalExample.description,
    //             {
    //                 gasLimit: 10000000,
    //             },
    //         )
    // ).wait();

    // console.log(`🤑 [${proposalExample.description}] 제안이 완료되었습니다. 🤑\n`);

    console.log("========= 전체 제안 확인 =========");

    const data = await fantosiView.getArtistAllProposalInfo(photoCardInfo.NEWJEANS.symbol);

    for (let i = 0; i < data.length; i++) {
        console.log(`${data[0].id}번째 제안: ${data[0].description})`);
        console.log("제안자: ", data[0].proposer);
        console.log("시작 시간(Block): ", data[0].startBlock.toString());
        console.log("종료 시간(Block): ", data[0].endBlock.toString());
        console.log("투표 상태: ", data[0].state);
        console.log("찬성: ", data[0].forVotes.toString());
        console.log("반대: ", data[0].againstVotes.toString());
        console.log("기권: ", data[0].abstainVotes.toString());
        console.log(
            `이 제안은 ${data[0].targets[0]
                .substring(0, 6)
                .concat("...")}에게 ${data[0].sendValues.toString()}를 지급합니다.`,
        );
    }
};

bid();

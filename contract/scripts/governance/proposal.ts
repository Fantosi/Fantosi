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

    // console.log(`ðĪ [${proposalExample.description}] ė ėėī ėëĢëėėĩëëĪ. ðĪ\n`);

    console.log("========= ė ėēī ė ė íėļ =========");

    const data = await fantosiView.getArtistAllProposalInfo(photoCardInfo.NEWJEANS.symbol);

    for (let i = 0; i < data.length; i++) {
        console.log(`${data[0].id}ëēė§ļ ė ė: ${data[0].description})`);
        console.log("ė ėė: ", data[0].proposer);
        console.log("ėė ėę°(Block): ", data[0].startBlock.toString());
        console.log("ėĒëĢ ėę°(Block): ", data[0].endBlock.toString());
        console.log("íŽí ėí: ", data[0].state);
        console.log("ė°Žėą: ", data[0].forVotes.toString());
        console.log("ë°ë: ", data[0].againstVotes.toString());
        console.log("ęļ°ęķ: ", data[0].abstainVotes.toString());
        console.log(
            `ėī ė ėė ${data[0].targets[0]
                .substring(0, 6)
                .concat("...")}ėęē ${data[0].sendValues.toString()}ëĨž ė§ęļíĐëëĪ.`,
        );
    }
};

bid();

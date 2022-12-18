import { provider, wallet } from "../util/provider";
import { ethers } from "ethers";
import { contracts as bnbContracts } from "../../deployments/bnb_testnet.json";
import { FantosiAuctionHouse } from "../../typechain";
import { unixToTimeString } from "../util/date";

// Bid Amount
const bidAmount = ethers.utils.parseEther("0.0001");

export const bid = async () => {
    const fantosiAuctionHouse = new ethers.Contract(
        bnbContracts.FantosiAuctionHouse.address,
        bnbContracts.FantosiAuctionHouse.abi,
        provider,
    ) as FantosiAuctionHouse;

    const auction = await fantosiAuctionHouse.auction();

    console.log("========= 현재 Auction 정보 확인 =========");

    const blockNumber = await provider.getBlockNumber();
    const currentBlock = await provider.getBlock(blockNumber);

    console.log("현재 시간(unix): ", currentBlock.timestamp);
    console.log("시작 시간(unix): ", auction.startTime.toString());
    console.log("최종 입찰 전환 시간(unix): ", auction.finalAuctionTime.toString());
    console.log("종료 시간(unix): ", auction.endTime.toString());
    console.log("\n");

    console.log("현재 시간: ", unixToTimeString(currentBlock.timestamp));
    console.log("시작 시간: ", unixToTimeString(auction.startTime.toNumber()));
    console.log("최종 입찰 전환 시간: ", unixToTimeString(auction.finalAuctionTime.toNumber()));
    console.log("종료 시간: ", unixToTimeString(auction.endTime.toNumber()));
    console.log("\n");

    console.log("현재 입찰자 ", auction.bidder);
    console.log("현재 입찰자의 입찰 금액 ", auction.amount.toString());
    console.log("\n");

    await (
        await fantosiAuctionHouse.connect(wallet).createBid(auction.photoCardId, {
            gasLimit: 10000000,
            value: bidAmount,
        })
    ).wait();

    console.log("🤑 입찰을 완료하였습니다. 🤑\n");

    console.log("========= 입찰 후 Auction 정보 확인 =========");

    const newBlockNumber = await provider.getBlockNumber();
    const newCurrentBlock = await provider.getBlock(newBlockNumber);

    const newAuction = await fantosiAuctionHouse.auction();

    console.log("현재 시간(unix): ", newCurrentBlock.timestamp);
    console.log("시작 시간(unix): ", newAuction.startTime.toString());
    console.log("최종 입찰 전환 시간(unix): ", newAuction.finalAuctionTime.toString());
    console.log("종료 시간(unix): ", newAuction.endTime.toString());
    console.log("\n");

    console.log("현재 시간: ", unixToTimeString(newCurrentBlock.timestamp));
    console.log("시작 시간: ", unixToTimeString(newAuction.startTime.toNumber()));
    console.log("최종 입찰 전환 시간: ", unixToTimeString(newAuction.finalAuctionTime.toNumber()));
    console.log("종료 시간: ", unixToTimeString(newAuction.endTime.toNumber()));
    console.log("\n");

    console.log("현재 입찰자 ", newAuction.bidder);
    console.log("현재 입찰자의 입찰 금액 ", newAuction.amount.toString());
    console.log("\n");
};

bid();

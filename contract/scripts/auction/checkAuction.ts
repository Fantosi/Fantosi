import { provider, wallet } from "../util/provider";
import { ethers } from "ethers";
import { contracts as bnbContracts } from "../../deployments/bnb_testnet.json";
import { FantosiAuctionHouse } from "../../typechain";
import { unixToTimeString } from "../util/date";

export const checkAuction = async () => {
    const fantosiAuctionHouse = new ethers.Contract(
        bnbContracts.FantosiAuctionHouse.address,
        bnbContracts.FantosiAuctionHouse.abi,
        provider,
    ) as FantosiAuctionHouse;

    const auction = await fantosiAuctionHouse.auction();

    console.log("\n========= 현재 Auction 정보 확인 =========\n");

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

    console.log("현재 입찰자: ", auction.bidder);
    console.log("현재 입찰자의 입찰 금액: ", auction.amount.toString());
    console.log("\n");

    console.log("🤑 Auction 정보 확인을 완료하였습니다. 🤑\n");
};

checkAuction();

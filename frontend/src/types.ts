import { BigNumber } from "ethers";

export interface UserInfo {
  role: "ADMIN" | "USER";
  address: string;
}

export interface CardInfo {
  key: number;
  likeCnt: number;
  artist: string;
  bidDone: boolean;
}

export enum STATUS {
  EXECUTED = "EXECUTED",
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  DEFEATED = "DEFEATED",
  QUEUED = "QUEUED",
}

// use for hooks for now.
export interface ArtistInfo {
  artistKey: string;
  fantosiTokenAddr: string;
  auctionHouseAddr: string;
}

export interface PhotoCardInfo {
  metadataURI: string;
  auction: AuctionInfo;
}

export interface AuctionInfo {
  photoCardId: BigNumber;
  amount: BigNumber;
  startTime: BigNumber;
  finalAuctionTime: BigNumber;
  endTime: BigNumber;
  bidder: string;
  isFinalBid: boolean;
  settled: boolean;
}

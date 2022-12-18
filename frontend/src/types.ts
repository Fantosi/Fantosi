import { BigNumber } from "ethers";
import Web3 from "web3";
import { Utils } from "web3-utils";

export interface UserInfo {
  role: "ADMIN" | "USER";
  address: string;
}

export interface CardInfo {
  key: number;
  likeCnt: number;
  artist: string;
  bidDone: boolean;
  src?: string;
  currentBid?: string;
  endtime?: number;
}

export enum STATUS {
  EXECUTED = "Excecuted",
  ACTIVE = "Active",
  CANCELED = "Canceled",
  DEFEATED = "Defeated",
  QUEUED = "Queued",
}

// use for hooks for now.
export interface ArtistInfo {
  artistKey: string;
  fantosiTokenAddr: string;
  auctionHouseAddr: string;
}

export interface PhotoCardInfo {
  metadataURI: string;
  currentAuction: AuctionInfo;
  imageInfo: ImageInfo;
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

export interface Web3Type {
  signInWithWeb3Onboard: () => Promise<string | undefined>;
  signOutWithWeb3Onboard: () => Promise<void>;
  account: string;
  createBid: (photoCardId: number, bidAmount: number) => Promise<void>;
  getAllArtistInfo: () => Promise<ArtistInfo[]>;
  getAllPhotoCardInfo: () => Promise<PhotoCardInfo[]>;
  getArtistPhotoCardInfo: (artistKey: string) => Promise<PhotoCardInfo | null>;
  getArtistPhotoCardHistoryInfo: (
    artistKey: string
  ) => Promise<PhotoCardInfo[]>;
  web3Utils: Utils | undefined;
  getArtistAllProposalInfo: (artistKey: string) => Promise<ProposalInfo[]>;
  submitPropose: (
    targetAddress: string,
    amount: string,
    idea: string
  ) => Promise<void>;
  castVote: (proposalId: number, vote: VoteKind) => Promise<boolean>;
}

export interface ProposalInfo {
  id: BigNumber;
  proposer: string;
  proposalThreshold: BigNumber;
  quorumVotes: BigNumber;
  eta: BigNumber;
  startBlock: BigNumber;
  endBlock: BigNumber;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  canceled: boolean;
  vetoed: boolean;
  executed: boolean;
  totalSupply: BigNumber;
  creationBlock: BigNumber;
  targets: string[];
  sendValues: BigNumber[];
  description: string;
  state: string;
  likedByArtist?: boolean;
}

export interface MakeProposal {
  targets: string[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
  idea: string;
}

export enum VoteKind {
  AGAINST = "0",
  FOR = "1",
  ABSTAIN = "2",
}

export enum VotingState {
  AGREE = "AGREE",
  DISAGREE = "DISAGREE",
  SOSO = "SOSO",
}

export interface ImageInfo {
  artist: string;
  descriptions: string;
  edition: number;
  image: string;
  name: string;
}

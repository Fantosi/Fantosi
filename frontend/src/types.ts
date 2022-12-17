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

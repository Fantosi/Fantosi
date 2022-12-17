export type UserInfo = {
  role: "ADMIN" | "USER";
  address: string;
};

export type CardInfo = {
  key: number;
  likeCnt: number;
  artist: string;
  bidDone: boolean;
};

export enum STATUS {
  EXECUTED = "EXECUTED",
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  DEFEATED = "DEFEATED",
  QUEUED = "QUEUED",
}

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

import { BigNumber } from "ethers";
import { ProposalInfo, STATUS } from "../types";

export const dummyProposals: ProposalInfo[] = [
  {
    id: BigNumber.from("4"),
    proposer: "0x7d61dA044aA8059ffFC37b873b344ae2F163cA98",
    proposalThreshold: BigNumber.from("1"),
    quorumVotes: BigNumber.from("50"),
    forVotes: BigNumber.from("11"),
    againstVotes: BigNumber.from("3"),
    abstainVotes: BigNumber.from("8"),
    eta: BigNumber.from("1"),
    startBlock: BigNumber.from("1"),
    endBlock: BigNumber.from("1"),
    canceled: false,
    vetoed: false,
    executed: false,
    totalSupply: BigNumber.from("100"),
    creationBlock: BigNumber.from("1"),
    targets: ["0x7d61dA044aA8059ffFC37b873b344ae2F163cA98"],
    sendValues: [BigNumber.from("34")],
    description:
      "추운 날씨에도 사녹 와주는 고마운\n우리 버니즈를 위한 맛난 도시락 역조공!",
    state: STATUS.EXECUTED,
    likedByArtist: true,
  },
  {
    id: BigNumber.from("5"),
    proposer: "0x7d61dA044aA8059ffFC37b873b344ae2F163cA98",
    proposalThreshold: BigNumber.from("1"),
    quorumVotes: BigNumber.from("200"),
    forVotes: BigNumber.from("55"),
    againstVotes: BigNumber.from("34"),
    abstainVotes: BigNumber.from("20"),
    eta: BigNumber.from("1"),
    startBlock: BigNumber.from("1"),
    endBlock: BigNumber.from("1"),
    canceled: false,
    vetoed: false,
    executed: false,
    totalSupply: BigNumber.from("500"),
    creationBlock: BigNumber.from("1"),
    targets: ["0x7d61dA044aA8059ffFC37b873b344ae2F163cA98"],
    sendValues: [BigNumber.from("60")],
    description: "뉴진스 \n[인기가요 데뷔] 첫방 기념 밥차 서포트",
    state: STATUS.DEFEATED,
  },
  {
    id: BigNumber.from("6"),
    proposer: "0x7d61dA044aA8059ffFC37b873b344ae2F163cA98",
    proposalThreshold: BigNumber.from("1"),
    quorumVotes: BigNumber.from("200"),
    forVotes: BigNumber.from("3"),
    againstVotes: BigNumber.from("6"),
    abstainVotes: BigNumber.from("20"),
    eta: BigNumber.from("1"),
    startBlock: BigNumber.from("1"),
    endBlock: BigNumber.from("1"),
    canceled: false,
    vetoed: false,
    executed: false,
    totalSupply: BigNumber.from("40"),
    creationBlock: BigNumber.from("1"),
    targets: ["0x7d61dA044aA8059ffFC37b873b344ae2F163cA98"],
    sendValues: [BigNumber.from("7")],
    description:
      "뉴진스 프리 싱글 [Ditto] 발매 기념\n멜론 300곡 스트리밍권 100장",
    state: STATUS.EXECUTED,
  },
  {
    id: BigNumber.from("7"),
    proposer: "0x7d61dA044aA8059ffFC37b873b344ae2F163cA98",
    proposalThreshold: BigNumber.from("1"),
    quorumVotes: BigNumber.from("50"),
    forVotes: BigNumber.from("11"),
    againstVotes: BigNumber.from("3"),
    abstainVotes: BigNumber.from("8"),
    eta: BigNumber.from("1"),
    startBlock: BigNumber.from("1"),
    endBlock: BigNumber.from("1"),
    canceled: false,
    vetoed: false,
    executed: false,
    totalSupply: BigNumber.from("100"),
    creationBlock: BigNumber.from("1"),
    targets: ["0x7d61dA044aA8059ffFC37b873b344ae2F163cA98"],
    sendValues: [BigNumber.from("34")],
    description:
      "[뉴진스 & 버니즈] 이름으로 \n[초록우산 기부재단] 2100만원 기부",
    state: STATUS.QUEUED,
  },
];
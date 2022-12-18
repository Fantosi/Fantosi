import { useEffect, useState } from "react";
import "../css/Dashboard.css";
import { CardInfo, UserInfo, Web3Type } from "../types";
import CardList from "./CardList";
import Vision from "./Vision";

interface DashboardProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  onClickSignIn: () => Promise<void>;
}

const Dashboard = (propse: DashboardProps) => {
  const cardList: CardInfo[] = [
    { key: 1, likeCnt: 88, artist: "NCT 127", bidDone: false },
    { key: 2, likeCnt: 2, artist: "TXT", bidDone: true },
    { key: 3, likeCnt: 55, artist: "NCT 127", bidDone: false },
    { key: 4, likeCnt: 34, artist: "Dummy", bidDone: false },
    { key: 5, likeCnt: 63, artist: "Dummy", bidDone: false },
    { key: 6, likeCnt: 87, artist: "TXT", bidDone: true },
    { key: 7, likeCnt: 6, artist: "Dummy", bidDone: true },
    { key: 8, likeCnt: 4, artist: "Dummy", bidDone: true },
    { key: 9, likeCnt: 1, artist: "TXT", bidDone: false },
    { key: 10, likeCnt: 3, artist: "TXT", bidDone: false },
    { key: 11, likeCnt: 33, artist: "TXT", bidDone: false },
    { key: 12, likeCnt: 12, artist: "TXT", bidDone: true },
    { key: 13, likeCnt: 143, artist: "TXT-12", bidDone: true },
    { key: 14, likeCnt: 3, artist: "TXT-3", bidDone: true },
    { key: 15, likeCnt: 166, artist: "TXT-1", bidDone: true },
  ];

  const bidDoneCardList = cardList.filter((card) => card.bidDone);
  const biddingCardList = cardList.filter((card) => !card.bidDone);
  const [clickedCardKey, setClickedCardKey] = useState<number | undefined>(
    undefined
  );

  const selectCard = (key: number | undefined) => {
    setClickedCardKey(key);
  };

  return (
    <>
      <div className="component_wrapper">
        <div className="section_header" id="fresh_section">
          <div className="header_text" />
          <div className="header_line" />
          <div className="header_star" />
        </div>
        <CardList
          cardList={biddingCardList}
          clickedCardKey={clickedCardKey}
          selectCard={selectCard}
        />
        <div className="section_header" id="taken_section">
          <div className="header_text" />
          <div className="header_line" />
          <div className="header_star" />
        </div>
        <CardList
          cardList={bidDoneCardList}
          clickedCardKey={clickedCardKey}
          selectCard={selectCard}
        />
        <Vision />
      </div>
    </>
  );
};

export default Dashboard;

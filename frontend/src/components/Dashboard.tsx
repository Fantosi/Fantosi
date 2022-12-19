import { useEffect, useState } from "react";
import "../css/Dashboard.css";
import { CardInfo, PhotoCardInfo, UserInfo, Web3Type } from "../types";
import { getNftImgInfos } from "../utils/handleNft";
import CardList from "./CardList";
import Vision from "./Vision";
const dummy1 = require("../img/dummy-card.png");
const dummy2 = require("../img/dummy-card-1.jpg");
const dummy3 = require("../img/dummy-card-2.jpg");
const dummy4 = require("../img/dummy-card-3.jpg");
const dummy5 = require("../img/dummy-card-4.jpg");
const dummy6 = require("../img/dummy-card-6.jpg");
const dummy7 = require("../img/dummy-card-7.jpg");
const dummy8 = require("../img/dummy-card-8.jpg");
const dummy9 = require("../img/dummy-card-9.jpg");

interface DashboardProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const Dashboard = ({ web3, user, signIn }: DashboardProps) => {
  const [photoCardInfo, setPhotoCardInfo] = useState<PhotoCardInfo | undefined>(
    undefined
  );

  const cardList: CardInfo[] = [
    {
      key: 2,
      likeCnt: 2,
      artist: "Newjeans",
      bidDone: true,
      src: dummy1,
    },
    {
      key: 12,
      likeCnt: 12,
      artist: "Newjeans",
      bidDone: true,
      src: dummy2,
    },
    {
      key: 13,
      likeCnt: 143,
      artist: "Newjeans",
      bidDone: true,
      src: dummy3,
    },
    {
      key: 14,
      likeCnt: 3,
      artist: "Newjeans",
      bidDone: true,
      src: dummy4,
    },
    {
      key: 15,
      likeCnt: 166,
      artist: "Newjeans",
      bidDone: true,
      src: dummy5,
    },
    {
      key: 6,
      likeCnt: 87,
      artist: "Newjeans",
      bidDone: true,
    },
    {
      key: 7,
      likeCnt: 6,
      artist: "Dummy",
      bidDone: true,
    },
    {
      key: 8,
      likeCnt: 4,
      artist: "Dummy",
      bidDone: true,
    },
    {
      key: 3,
      likeCnt: 55,
      artist: "NCT 127",
      bidDone: false,
      src: dummy9,
    },
    {
      key: 4,
      likeCnt: 34,
      artist: "Newjeans",
      bidDone: false,
      src: dummy7,
    },
    {
      key: 5,
      likeCnt: 63,
      artist: "Newjeans",
      bidDone: false,
      src: dummy8,
    },
    {
      key: 9,
      likeCnt: 1,
      artist: "Newjeans",
      bidDone: false,
    },
    {
      key: 10,
      likeCnt: 3,
      artist: "TXT",
      bidDone: false,
      src: dummy6,
    },
    {
      key: 11,
      likeCnt: 33,
      artist: "TXT",
      bidDone: false,
    },
    {
      key: 12,
      likeCnt: 12,
      artist: "TXT",
      bidDone: true,
    },
    {
      key: 13,
      likeCnt: 143,
      artist: "TXT-12",
      bidDone: true,
    },
    {
      key: 14,
      likeCnt: 3,
      artist: "TXT-3",
      bidDone: true,
    },
    {
      key: 15,
      likeCnt: 166,
      artist: "TXT-1",
      bidDone: true,
    },
  ];

  const bidDoneCardList = cardList.filter((card) => card.bidDone);

  const biddingCardList = photoCardInfo
    ? [
        {
          key: Number(photoCardInfo.currentAuction.photoCardId),
          likeCnt: 23,
          artist: photoCardInfo.imageInfo.artist,
          bidDone: false,
          src: photoCardInfo.imageInfo.image,
          currentBid: web3.web3Utils?.fromWei(
            photoCardInfo.currentAuction.amount as unknown as string
          ),
          endtime: Number(photoCardInfo.currentAuction.finalAuctionTime),
        },
        ...cardList.filter((card) => !card.bidDone),
      ]
    : cardList.filter((card) => !card.bidDone);

  const [clickedCardKey, setClickedCardKey] = useState<number | undefined>(
    undefined
  );

  const selectCard = (key: number | undefined) => {
    setClickedCardKey(key);
  };

  const getArtistPhotoCardHistoryInfo = async () => {
    const responseFromContract = await web3.getArtistPhotoCardHistoryInfo(
      "NEWJEANS"
    );
    const imageInfos = await getNftImgInfos(responseFromContract);

    if (
      responseFromContract &&
      responseFromContract.length > 0 &&
      imageInfos.length === responseFromContract.length
    ) {
      const newPhotoCardInfos = [];
      for (let i = 0; i < imageInfos.length; i++) {
        const { currentAuction, metadataURI } = responseFromContract[i];
        const imageInfo = imageInfos[i];
        const photoCardInfo: PhotoCardInfo = {
          currentAuction,
          metadataURI,
          imageInfo,
        };
        newPhotoCardInfos.push(photoCardInfo);
      }
      setPhotoCardInfo(newPhotoCardInfos[newPhotoCardInfos.length - 1]);
    }
  };

  useEffect(() => {
    if (user === undefined) {
      signIn();
      return;
    } else {
      getArtistPhotoCardHistoryInfo();
    }
  }, [user]);

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

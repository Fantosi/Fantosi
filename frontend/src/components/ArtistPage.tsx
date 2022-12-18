import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ArtistPage.css";
import { STATUS, Web3Type } from "../types";
import Carousel from "./Carousel";
import ProposalModal from "./ProposalModal";
import TreasuryCard from "./TreasuryCard";

interface ArtistPageProps {
  web3: Web3Type;
}

const ArtistPage = (props: ArtistPageProps) => {
  const { artistPageToken } = useParams();
  const [cardIndex, setCardIndex] = useState(4);
  const [showModal, setShowModal] = useState(false);

  const getArtistPhotoCardHistoryInfo = async () => {
    console.log("getArtistPhotoCardHistoryInfo start");
    const test = await web3.getArtistPhotoCardHistoryInfo("NEWJEANS");
    console.log("test", test);
  };

  useEffect(() => {
    console.log("ArtistPage useEffect start");
    getArtistPhotoCardHistoryInfo();
  }, []);

  const web3 = props.web3;

  if (artistPageToken === undefined) {
    return <div></div>;
  }
  const [artistId, cardId] = artistPageToken.split("-");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderArtistInfo = () => {
    return (
      <>
        <div className="artistinfo">
          <img
            className="artistinfo_img"
            src={require("../img/dummy-artistinfo.png")}
            alt=""
          />
          <div className="artistinfo_text">
            <div className="title">
              Hi, <br />
              We're NewJeans!
            </div>
            <div className="line" />
            <div className="minititle">둘, 셋! 안녕하세요, NewJeans입니다!</div>
          </div>
        </div>
        <div className="artistinfo_bar" />
      </>
    );
  };

  const onClickBiddingBtn = async () => {
    // const test = await web3.createBid(1, 0.0000001);
    // console.log("test", test);
  };

  const renderArtistPhotoCards = () => {
    const address = "0X3864fffaefweaf";
    const renderBiddingInfo = () => {
      return (
        <div className="biddinginfo-wrapper">
          <div className="row-wrapper">
            <div className="left-wrapper">
              <div className="header">CURRENT BID</div>
              <div className="value">
                120 <div className="bnb_icon" />
              </div>
            </div>
            <div className="right-wrapper">
              <div className="header">AUCTION ENDS IN</div>
              <div className="value">02:12:39</div>
            </div>
          </div>
          <div className="row-wrapper">
            <div className="left-wrapper">
              <div className="header high">CURRENT BID</div>
              <div className="value">
                <div className="charactor_icon" />
                <div className="address">{address.slice(0, 6) + "..."}</div>
              </div>
            </div>
            <div className="right-wrapper">
              <div className="header"></div>
              <div className="value">
                120
                <div className="bnb_icon" />
              </div>
            </div>
          </div>
        </div>
      );
    };

    const handlePlaceBid = async () => {
      await web3.createBid(1, 0.0001);
    };

    return (
      <>
        <div className="artistcards">
          <div className="artistcards-title">Auction</div>
          <div className="artistcards-wrapper">
            <div className="cards-wrapper">
              <Carousel setCardIndex={setCardIndex} />
            </div>
            <div className="cardinfo-wrapper">
              <div className="title">Photocard #21</div>
              <div className="sub-title">
                첫 번째 앨범 “NewJeans”의 다니엘 미공개 컷.
              </div>
              <div className="line" />
              {renderBiddingInfo()}
              <div className="input-wrapper">
                <input placeholder="" />
                <div className="input-btn" onClick={handlePlaceBid}>
                  PLACE BID
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderFantosiHouseBtnBar = () => {
    return (
      <div className="fantosihouse-wrapper">
        <div className="fantosihouse-btn" />
        <div className="fantosihouse-txt">
          FANTOSI는 Nouns DAO에서 사용한 Daily Auction(하루에 하나씩, 경매를
          통하여 NFT가 발행) 방식을 사용합니다. <br />
          FANTOSI의 Membership NFT는 스마트 컨트랙트에 의하여 24시간에 하나씩
          발행되며, 경매 방식을 통하여 구매할 수 있습니다.
        </div>
      </div>
    );
  };

  const renderTreasury = () => {
    const datas = [
      {
        id: 116,
        expiredIn: 2,
        status: STATUS.EXECUTED,
        title: "익선동 카페 [오늘다움]에서 2022 다니엘 생일 카페 개최",
        likedByArtist: false,
      },
      {
        id: 115,
        expiredIn: 5,
        status: STATUS.ACTIVE,
        title: "tvn 방송 [유퀴즈 온더 블럭] 뉴진스 출연 밥차 조공",
        likedByArtist: false,
      },
      {
        id: 114,
        expiredIn: 16,
        status: STATUS.CANCELED,
        title: "뉴진스 [인기가요 데뷔] 첫방 기념 밥차 서포트",
        likedByArtist: false,
      },
      {
        id: 113,
        expiredIn: 17,
        status: STATUS.DEFEATED,
        title: "뉴진스 프리 싱글 [Ditto] 발매 기념 멜론 300곡 스트리밍권 100장",
        likedByArtist: false,
      },
      {
        id: 112,
        expiredIn: 18,
        status: STATUS.QUEUED,
        title:
          "추운 날씨에도 사녹 와주는 고마운 우리 버니즈를 위한 맛난 도시락 역조공!",
        likedByArtist: true,
      },
      {
        id: 111,
        expiredIn: 20,
        status: STATUS.EXECUTED,
        title: "데뷔 500일 기념 [역삼역 3번 출구] 지하철 광고",
        likedByArtist: false,
      },
      {
        id: 110,
        expiredIn: 22,
        status: STATUS.ACTIVE,
        title: "[뉴진스 & 버니즈] 이름으로 [초록우산 기부재단] 2100만원 기부",
        likedByArtist: false,
      },
    ];
    return (
      <>
        <div className="treasury-wrapper">
          <div className="treasury-wrapper-title">WE'VE COLLECTED.</div>
          <div className="treasury-history" />
          <div className="treasury-header">
            <div className="treasury-header-title">
              커뮤니티에서 함께하고 싶은 아이디어에 투표하고, 당신의 제안도
              올려주세요!
            </div>
            <div className="makeproposal-btn" onClick={openModal}>
              MAKE PROPOSAL
            </div>
          </div>
          <div className="treasury-cards">
            {datas.map((data, index) => {
              const { id, expiredIn, status, title, likedByArtist } = data;
              return (
                <TreasuryCard
                  key={index}
                  id={id}
                  expiredIn={expiredIn}
                  status={status}
                  title={title}
                  likedByArtist={likedByArtist}
                />
              );
            })}
          </div>
          <div className="pagination" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="artistpage">
        {renderArtistInfo()}
        {renderArtistPhotoCards()}
        {renderFantosiHouseBtnBar()}
        {renderTreasury()}
      </div>
      {showModal ? <ProposalModal closeModal={closeModal} /> : <></>}
    </>
  );
};

export default ArtistPage;

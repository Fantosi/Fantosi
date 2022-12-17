import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ArtistPage.css";
import Carousel from "./Carousel";

const ArtistPage = () => {
  const { artistPageToken } = useParams();
  const [cardIndex, setCardIndex] = useState(4);

  if (artistPageToken === undefined) {
    return <div></div>;
  }
  const [artistId, cardId] = artistPageToken.split("-");

  const renderArtistInfo = () => {
    return (
      <>
        <div className="artistinfo">
          <img
            className="artistinfo_img"
            src="/img/dummy-artistinfo.png"
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

  const renderArtistPhotoCards = () => {
    return (
      <>
        <div className="artistcards">
          <div className="artistcards-title">Auction</div>
          <div className="artistcards-wrapper">
            <div className="cards-wrapper">
              <Carousel setCardIndex={setCardIndex} />
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
    return (
      <>
        <div className="treasury-wrapper"></div>
      </>
    );
  };

  return (
    <div className="artistpage">
      {renderArtistInfo()}
      {renderArtistPhotoCards()}
      {renderFantosiHouseBtnBar()}
      {renderTreasury()}
    </div>
  );
};

export default ArtistPage;

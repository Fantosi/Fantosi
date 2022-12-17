import { useParams } from "react-router-dom";
import "../css/ArtistPage.css";

const ArtistPage = () => {
  const { artistPageToken } = useParams();
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
    return <div className="artistcards"></div>;
  };

  return (
    <div className="artistpage">
      {renderArtistInfo()}
      {renderArtistPhotoCards()}
    </div>
  );
};

export default ArtistPage;

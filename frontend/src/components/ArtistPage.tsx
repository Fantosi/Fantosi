import { useParams } from "react-router-dom";

const ArtistPage = () => {
  const { artistPageToken } = useParams();
  if (artistPageToken === undefined) {
    return <div></div>;
  }
  const [artistId, cardId] = artistPageToken.split("-");

  return (
    <div>
      artisPage {artistId} {cardId}
    </div>
  );
};

export default ArtistPage;

import { STATUS } from "../types";
import "../css/TreasuryCard.css";
import classNames from "classnames";

interface TreasuryCardProps {
  id: number;
  expiredIn: number;
  status: STATUS;
  title: string;
  likedByArtist: boolean;
}

const TreasuryCard = ({
  id,
  expiredIn,
  status,
  title,
  likedByArtist,
}: TreasuryCardProps) => {
  return (
    <div className={classNames("treasury-cards-wrapper", { likedByArtist })}>
      <div>
        <div className="treasury-index">{id}</div>
        <div className="treasury-title">
          {likedByArtist ? (
            <div className="artist-pick">artist pick!</div>
          ) : (
            <></>
          )}
          {title}
        </div>
      </div>
      <div>
        <div className="treasury-expireddate">{`Expired in ${expiredIn} days`}</div>

        <div
          className={classNames("treasury-status", {
            active: status === STATUS.ACTIVE,
            executed: status === STATUS.EXECUTED,
            canceled: status === STATUS.CANCELED,
            defeated: status === STATUS.DEFEATED,
            queued: status === STATUS.QUEUED,
          })}
        >
          {status === STATUS.ACTIVE ? (
            <div>{status}</div>
          ) : status === STATUS.EXECUTED ? (
            <div>{status}</div>
          ) : status === STATUS.CANCELED ? (
            <div>{status}</div>
          ) : status === STATUS.DEFEATED ? (
            <div>{status}</div>
          ) : status === STATUS.QUEUED ? (
            <div>{status}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreasuryCard;

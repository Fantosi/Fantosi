import { MouseEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CardItem.css";
import { CardInfo } from "../types";
import classNames from "classnames";
import useWeb3 from "../hooks/useWeb3";

type CardItemProps = {
  card: CardInfo;
  clickedCardKey: number | undefined;
  selectCard: (key: number | undefined) => void;
  src?: string;
};

const CardItem = ({ card, clickedCardKey, selectCard, src }: CardItemProps) => {
  const { likeCnt, artist, key } = card;
  const [hover, setHover] = useState<boolean>(false);
  const [remainTime, setRemainTime] = useState<{
    hour: number;
    min: number;
    sec: number;
  }>({ hour: 7, min: 40, sec: 20 });

  const setRemainTimeInterval = () => {
    const { endtime } = card;
    if (endtime === undefined) return;
    const getTime = () => {
      const currentDate = Date.now() / 1000;
      const diff = endtime - currentDate;
      if (typeof Math.round(diff / 3600) === "number")
        setRemainTime({
          hour: Math.round(diff / 3600),
          min: Math.round((diff % 3600) / 60),
          sec: Math.round((diff % 3600) % 60),
        });
    };
    getTime();
    setInterval(getTime, 1000);
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onClickCard = (e: SyntheticEvent) => {
    if (key === clickedCardKey) {
      selectCard(undefined);
    } else {
      selectCard(key);
    }
  };

  const isCardClicked = () => {
    return clickedCardKey === key;
  };

  const renderFrame = () => {
    return (
      <>
        <div className="topleft_frame" />
        <div className="topright_frame" />
        <div className="bottomleft_frame" />
        <div className="bottomright_frame" />
      </>
    );
  };

  const renderHoveredCard = () => {
    return (
      <div className="hovered_card_wrapper">
        <div className="img_crop">
          <img
            className={classNames("hovered_card_img", {
              biddone: card.bidDone,
            })}
            src={src ? src : require("../img/dummy-artist.png")}
            alt="error"
          />
        </div>
        <div className="hovered_card_desc">
          <div className="hovered_card_text">
            <div id="artist">{`${artist} #${key < 10 ? "0" + key : key}`}</div>
            <div id="likes">{`${likeCnt} Likes`}</div>
          </div>
          <div
            className={classNames("heart", {
              biddone: card.bidDone,
            })}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setRemainTimeInterval();
  }, []);
  const renderClickedCard = () => {
    const displayTime = (time: number) => {
      return time < 10 ? `0${time}` : time;
    };

    return (
      <div className="clicked_card_wrapper">
        <div className="clicked_card_header">
          <div className="artist">{artist}</div>
          <div className="key">{`#${key}`}</div>
        </div>
        <div className="img_crop">
          <img
            className={classNames("clicked_card_img", {
              biddone: card.bidDone,
            })}
            src={src ? src : require("../img/dummy-artist.png")}
            alt="error"
          />
        </div>
        <div className="auction_info">
          <div className="auction_time">
            <div className="aution_time_title">auction ends in</div>
            <div className="aution_left_time">{`${displayTime(
              remainTime.hour
            )}:${displayTime(remainTime.min)}:${displayTime(
              remainTime.sec
            )}`}</div>
          </div>
          <div className="vertical_line" />
          <div className="bidding_info">
            <div className="bidding_title">current bid</div>
            <div className="bidding_val">
              {card.currentBid ? card.currentBid : 23.22}
            </div>
          </div>
        </div>
        <Link
          to={`/artist-page/${artist}-${key}`}
          className="link discover_btn"
        >
          DISCOVER
        </Link>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <img
        className={classNames("card_img", { biddone: card.bidDone })}
        src={src ? src : require("../img/dummy-artist.png")}
        alt="error"
      />
    );
  };

  const clicked = isCardClicked();

  return (
    <div
      className="card_item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickCard}
    >
      {/* {hover ? renderFrame() : <></>} */}
      {clicked ? (
        renderClickedCard()
      ) : hover ? (
        <>
          {renderFrame()}
          {renderHoveredCard()}
        </>
      ) : (
        renderCard()
      )}
    </div>
  );
};

export default CardItem;

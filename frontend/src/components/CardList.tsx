import { useState } from "react";
import "../css/CardList.css";
import { CardInfo } from "../types";
import CardItem from "./CardItem";

type CardListProps = {
  cardList: CardInfo[];
  clickedCardKey: number | undefined;
  selectCard: (key: number | undefined) => void;
};

const CardList = ({ cardList, clickedCardKey, selectCard }: CardListProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  const onChangeImage = (index: number) => {
    if (index < 0 || index > cardList.length - 4) return;
    setCurrentImgIndex(index);
  };

  return (
    <div className="section_cards">
      <div
        id="left_side_arrow"
        className={currentImgIndex <= 0 ? "disable" : ""}
        onClick={() => {
          onChangeImage(currentImgIndex - 1);
        }}
      />
      <div className="cards_wrapper">
        {cardList.map((card, index) => {
          return (
            <div
              key={`${card.key}_${index}`}
              style={{
                transform: `translate3d(
              ${currentImgIndex * -210}px, 0px, 0px)`,
                transition: "all 300ms ease 0s",
              }}
            >
              <CardItem
                card={card}
                clickedCardKey={clickedCardKey}
                selectCard={selectCard}
                src={card.src}
              />
            </div>
          );
        })}
      </div>
      <div
        id="right_side_arrow"
        className={currentImgIndex >= cardList.length - 4 ? "disable" : ""}
        onClick={() => {
          onChangeImage(currentImgIndex + 1);
        }}
      />
    </div>
  );
};

export default CardList;

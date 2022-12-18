import classNames from "classnames";
import { Component, useRef } from "react";
import ReactCardCarousel from "react-card-carousel";
import { PhotoCardInfo } from "../types";
import "../css/Carousel.css";

const Carousel = ({ changeCardIndex, photoCardInfos }) => {
  const carouselCards = photoCardInfos.map((photoCardInfo) => {
    const { imageInfo } = photoCardInfo;
    return {
      key: imageInfo.name,
      imageSrc: imageInfo.image,
    };
  });

  let ref;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-controller">
        <div
          className="btn-wrapper left"
          onClick={() => {
            const currentIndex = ref.getCurrentIndex();
            console.log(currentIndex);
            if (currentIndex <= 1) return;
            changeCardIndex(currentIndex - 2);
            ref.prev();
          }}
        >
          <div className="carosel-btn left" />
        </div>
        <div
          className="btn-wrapper right"
          onClick={() => {
            const currentIndex = ref.getCurrentIndex();
            console.log(currentIndex);
            if (currentIndex >= carouselCards.length) return;
            changeCardIndex(currentIndex);
            ref.next();
          }}
        >
          <div className="carosel-btn right" />
        </div>
      </div>
      {photoCardInfos.length > 0 ? (
        <ReactCardCarousel
          initial_index={photoCardInfos.length}
          autoplay={false}
          spread={"wide"}
          disable_keydown={true}
          ref={(Carousel) => (ref = Carousel)}
        >
          <div></div>
          {carouselCards.map(({ imageSrc }, index) => {
            return (
              <div
                className={classNames("card-wrapper", {
                  last: index === carouselCards.length - 1,
                })}
                key={index}
              >
                <img src={imageSrc} />
              </div>
            );
          })}
          <div></div>
        </ReactCardCarousel>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Carousel;

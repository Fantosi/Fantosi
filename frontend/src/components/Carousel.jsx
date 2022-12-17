import classNames from "classnames";
import { Component, useRef } from "react";
import ReactCardCarousel from "react-card-carousel";
import "../css/Carousel.css";

const Carousel = ({ setCardIndex }) => {
  const carouselCards = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
  ];

  let ref;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-controller">
        <div
          className="btn-wrapper left"
          onClick={() => {
            if (ref.getCurrentIndex() <= 0) return;
            ref.prev();
          }}
        >
          <div className="carosel-btn left" />
        </div>
        <div
          className="btn-wrapper right"
          onClick={() => {
            if (ref.getCurrentIndex() >= carouselCards.length - 1) return;
            ref.next();
          }}
        >
          <div className="carosel-btn right" />
        </div>
      </div>

      <ReactCardCarousel
        initial_index={4}
        autoplay={false}
        autoplay_speed={2500}
        spread={"wide"}
        disable_keydown={true}
        ref={(Carousel) => (ref = Carousel)}
      >
        {carouselCards.map((_, index) => {
          return (
            <div
              className={classNames("card-wrapper", {
                last: index === carouselCards.length - 1,
              })}
              key={index}
            >
              <img src="/img/dummy-card.png" />
            </div>
          );
        })}
        <div style={{}}></div>
      </ReactCardCarousel>
    </div>
  );
};

export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scrollbar.css"
const QuoteCarousel = ({ quotes }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: <></>, 
    nextArrow: <></>,
    cssEase: "ease-out"
  };

  return (
    <Slider {...settings}>
      {quotes.map((quote, index) => (
        <div key={index}>
          <h2 className="quote text-xs md:text-base lg:text-sm text-white md:w-full sm:text-user-btns text-left font-medium rounded-2xl max-w-4xl mx-auto sm:mt-2">
            {quote}
          </h2>
        </div>
      ))}
    </Slider>
  );
};

export default QuoteCarousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ listings }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const lastFiveListings = listings.slice(-5);

  return (
    <div className="carousel mx-auto my-4 overflow-visible">
      <Slider {...carouselSettings}>
        {lastFiveListings.map((listing, index) => (
          <div key={listing.id} className="p-4">
            <div className="carousel-item">
              {listing.media.length > 0 ? (
                <div className="relative w-full h-96 overflow-hidden aspect-w-16 aspect-h-9">
                  <img
                    src={listing.media[0].url}
                    alt={listing.media[0].alt || `Image of ${listing.title}`}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              ) : (
                <p>No image available</p>
              )}
              <h2 className="text-center mt-2 text-lg font-semibold">{listing.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

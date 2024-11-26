import React, {useState,useEffect} from "react";
import Slider from "react-slick";


const Carousel = ({ listings,isSingleListing = false }) => {

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    // Update carousel images when listings change
    const images = isSingleListing
      ? listings[0]?.media || [] 
      : listings.slice(-5).flatMap((listing) => listing.media).slice(0, 5);
    
    setCarouselImages(images);
  }, [listings, isSingleListing]);

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  console.log("Images for carousel", carouselImages);

  // const images = isSingleListing
  // ? listings[0]?.media || [] 
  // : listings.slice(-5).flatMap((listing) => listing.media);
  // : listings.slice(-5).flatMap((listing) => listing.media).slice(0, 5);
  // console.log('images for carousel', images);



  return (
    <div className="carousel mx-auto my-4 overflow-visible">
      <Slider {...carouselSettings}>
        {carouselImages.map((mediaItem, index) => (
          <div key={index} className="p-4">
            <div className="carousel-item">
              {mediaItem?.url ? (
                <div className="relative w-full h-96 overflow-hidden aspect-w-16 aspect-h-9">
                  <img
                    src={mediaItem.url}
                    alt={mediaItem.alt || "Image"}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

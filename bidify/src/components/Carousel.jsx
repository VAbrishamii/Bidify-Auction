import React, {useState,useEffect} from "react";
import Slider from "react-slick";


const Carousel = ({ listings,isSingleListing = false,showAllImages = false }) => {

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (listings.length > 0) {
      if (isSingleListing && showAllImages) {
        // Show all images for a single listing
        const allMedia = listings.flatMap((listing) =>
          listing?.media?.map((mediaItem) => ({
            url: mediaItem.url,
            alt: mediaItem.alt || "Image",
            title: listing.title,
          })) || []
        );
        setCarouselImages(allMedia);
      } else {

        const validImages = [];
        const maxImages = 5;

        for (const listing of listings) {
          if (validImages.length >= maxImages) break; // Stop when we have enough images
          if (listing?.media && listing.media.length > 0) {
            const firstMediaItem = listing.media[0];
            validImages.push({
              url: firstMediaItem.url,
              alt: firstMediaItem.alt || "Image",
              title: listing.title,
            });
          }
        }

        setCarouselImages(validImages);
      }
    } else {
      setCarouselImages([]);
    }
  }, [listings, isSingleListing, showAllImages]);

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  console.log("Listings:", listings);
  console.log("Images for carousel", carouselImages);

  return (
    <div className="carousel mx-auto my-4 overflow-visible">
      {carouselImages.length > 0 ? (
        <Slider {...carouselSettings}>
          {carouselImages.map((mediaItem, index) => (
            <div key={index} className="p-4">
              <div className="carousel-item">
                <div className="relative w-full h-96 overflow-hidden aspect-w-16 aspect-h-9">
                  <img
                    src={mediaItem.url}
                    alt={mediaItem.alt || "Image"}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Carousel;



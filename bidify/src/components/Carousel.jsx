import React, {useState,useEffect} from "react";
import Slider from "react-slick";


const Carousel = ({ listings,isSingleListing = false }) => {

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (listings.length > 0) {
      const lastFiveListings = listings
        .slice()
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 5);
  
      const imagesWithTitles = lastFiveListings.flatMap((listing) =>
        (listing?.media || []).map((mediaItem) => ({
          url: mediaItem.url,
          alt: mediaItem.alt || "Image",
          title: listing.title || "Untitled",
        }))
      );
  
      setCarouselImages(imagesWithTitles);
    } else {
      setCarouselImages([]);
    }
  }, [listings, isSingleListing]);
  

  // useEffect(() => {
  //   const images = isSingleListing
  //     ? listings[0]?.media || [] // Single listing logic
  //     : listings
  //         .slice(-5) // Get the last 5 listings
  //         .flatMap((listing) => listing?.media || []) // Flatten media arrays
  //         .filter((mediaItem) => mediaItem?.url) // Filter valid media items
  //         .slice(0, 5); // Limit to 5 items
  //   setCarouselImages(images);
  // }, [listings, isSingleListing]);

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



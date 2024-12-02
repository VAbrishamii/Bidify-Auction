import React, { useState, useEffect } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Carousel = ({
  listings,
  isSingleListing = false,
  showAllImages = false,
}) => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (listings.length > 0) {
      if (isSingleListing && showAllImages) {
        const allMedia = listings.flatMap(
          (listing) =>
            listing?.media?.map((mediaItem) => ({
              original: mediaItem.url,
              thumbnail: mediaItem.url,
              description: mediaItem.alt || "Image",
              title: listing.title,
            })) || []
        );
        setCarouselImages(allMedia);
      } else {
        const validImages = [];
        const maxImages = 5;

        for (const listing of listings) {
          if (validImages.length >= maxImages) break;
          if (listing?.media && listing.media.length > 0) {
            const firstMediaItem = listing.media[0];
            validImages.push({
              original: firstMediaItem.url,
              thumbnail: firstMediaItem.url,
              description: firstMediaItem.alt || "Image",
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

  console.log("Listings:", listings);
  console.log("Images for carousel", carouselImages);

  return (
    <div className="carousel mx-auto my-4 overflow-visible">
      {carouselImages.length > 0 ? (
        <Gallery
          items={carouselImages} // Pass the images to react-image-gallery
          showThumbnails={false} // Enable thumbnails below the main images
          showFullscreenButton={true} // Enable fullscreen button
          showPlayButton={false} // Disable play button
          autoPlay={true} // Enable auto play
          slideInterval={3000} // Set slide interval (in milliseconds)
          showBullets={true} // Enable bullets below the main images
          renderLeftNav={() => null} // Hide left navigation arrow
          renderRightNav={() => null} // Hide right navigation
        />
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Carousel;

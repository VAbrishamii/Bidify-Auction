import { useState, useEffect } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
/**
 *
 * Carousel component displays a carousel of images for listings.
 * It can handle both single listing images and multiple listings.
 *
 */
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

  return (
    <div className="carousel mx-auto my-4 overflow-visible">
      {carouselImages.length > 0 ? (
        <Gallery
          items={carouselImages}
          showThumbnails={false}
          showFullscreenButton={true}
          showPlayButton={false}
          autoPlay={true}
          slideInterval={3000}
          showBullets={true}
          renderLeftNav={() => null}
          renderRightNav={() => null}
        />
      ) : (
        <p className="filter-result">No images available</p>
      )}
    </div>
  );
};

export default Carousel;

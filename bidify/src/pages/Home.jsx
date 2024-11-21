import React, { useEffect, useState } from "react";
import { getAllListings } from "../service/all_listing";
import ListingCard from "../components/ListingCard";
import Slider from "react-slick";

const Home = () => {
  const [listings, setListings] = useState([]);
  console.log("listings", listings);

  useEffect(() => {
    const loadListings = async () => {
      console.log("inside loadListings");
      try {
        const listingsData = await getAllListings();
        console.log("listingsData", listingsData);
        setListings(listingsData);
      } catch (error) {
        console.error("Error loading listings", error);
      }
    };
    loadListings();
  }, []);

  const lastFiveListings = listings.slice(-5);
  console.log("latest 5 listings", lastFiveListings);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autopalay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-page">
      {/* Carousel */}
      {lastFiveListings.length > 0 && (
        <div className="carousel mx-auto my-4 overflow-visible">
          <Slider {...carouselSettings}>
            {lastFiveListings.map((listing, index) => {
              console.log(`Rendering item ${index}`, listing.media[0].url);
              return (
                <div key={listing.id} className="p-4">
                  <div className="carousel-item">
                    {listing.media.length > 0 ? (
                      <div className="relative w-full h-96 overflow-hidden aspect-w-16 aspect-h-9">
                      <img
                        src={listing.media[0].url}
                        alt={
                          listing.media[0].alt || `Image of ${listing.title}`
                        }
                        className="w-full max-h-full object-contain rounded-md"
                      />
                      </div>
                    ) : (
                      <p>No image available</p>
                    )}
                    <h2 className="text-center mt-2 text-lg font-semibold">
                      {listing.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}

      {/* Card*/}
      {listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default Home;

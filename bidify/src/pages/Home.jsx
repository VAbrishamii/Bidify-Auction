import React, { useEffect, useState } from "react";
import { getAllListings } from "../service/all_listing";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/pagination";


const Home = () => {
  const [listings, setListings] = useState([]);
  console.log("listings", listings);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

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

  const indexOfLastListing = currentPage * itemsPerPage;
  const indexOfFirstListing = indexOfLastListing - itemsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  
  return (
    <div className="home-page">
      {/* Carousel */}
      <Carousel listings={listings} />

      {/* Listings */}
      {currentListings.length > 0 ? (
        <div className="listings">
          {currentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}

      {/* Pagination */}
      <Pagination
        listings={listings}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/pagination";
import AuctionAPI from "../service/AuctionAPI";

const auctionAPI = new AuctionAPI('https://v2.api.noroff.dev/');


const Home = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  useEffect(() => {
    const loadListings = async () => {
      try {
        const listingsData = await auctionAPI.getALLListings();
        console.log("listingsData", listingsData);

        if (listingsData) {
          setListings(listingsData.data);
        } else {  
          console.error("Error loading listings", listingsData);
          setListings([]);
        }
      
      } catch (error) {
        console.error("Error loading listings", error);
        setListings([]);
      }
    };
    loadListings();
  }, []);

  // const handleNewListing = (newListing) => {
  //   setListings((prev) => [newListing, ...prev]);
  // };


  const indexOfLastListing = currentPage * itemsPerPage;
  const indexOfFirstListing = indexOfLastListing - itemsPerPage;
  const currentListings = Array.isArray(listings) ? listings.slice(indexOfFirstListing, indexOfLastListing) : [];



  
  return (
    <div className="home-page">
        {/* <Createlist onNewListing={handleNewListing} /> */}

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

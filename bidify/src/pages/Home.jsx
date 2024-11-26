import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/pagination";
import AuctionAPI from "../service/AuctionAPI";
import { useLocation } from "react-router-dom";

const auctionAPI = new AuctionAPI('https://v2.api.noroff.dev/');


const Home = () => {
  const [listings, setListings] = useState([]);
  const [meta, setMeta] = useState({}); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [refreshListings, setRefreshListings] = useState(false);
  const itemsPerPage = 14;
  const location = useLocation();

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        const { listings, meta } = await auctionAPI.getALLListings(currentPage, itemsPerPage, 'created', 'desc');  
       setListings(listings);
        setMeta(meta);
        console.log("listingsData", listings);
        // if (listings) {
        //   setListings(listings);  
        //   setMeta(meta); 
        // } else {
        //   console.error("Error loading listings", listings);
        //   setListings([]);
        // }
      } catch (error) {
        console.error("Error loading listings", error);
        setListings([]);
      }finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [currentPage]);


  useEffect(() => {
    if (location.state?.newListing) {
      setListings((prev) => [location.state.newListing, ...prev]);
      // setCurrentPage((prev) => !prev);
    }
  }, [location.state]);


  // const indexOfLastListing = currentPage * itemsPerPage;
  // const indexOfFirstListing = indexOfLastListing - itemsPerPage;
  // const currentListings = Array.isArray(listings) ? listings.slice(indexOfFirstListing, indexOfLastListing) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <div className="home-page">

      {/* Carousel */}
      <Carousel listings={listings} />

         {/* Listings Section */}
         {loading ? (
        <p>Loading...</p> // Show loading state while data is being fetched
      ) : listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p> // Handle case when no listings are available
      )}

      {/* Listings
      {currentListings.length > 0 ? (
        <div className="listings">
          {currentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )} */}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={meta.pageCount || 1}  
        onPageChange={handlePageChange}  
      />
    </div>
  );
};

export default Home;

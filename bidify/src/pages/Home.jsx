// import React, { useEffect, useState } from "react";
// import ListingCard from "../components/ListingCard";
// import Carousel from "../components/Carousel";
// import Pagination from "../components/pagination";
// import { useLocation } from "react-router-dom";
// import useAuctipnAPI from "../constants/instance";


// const Home = () => {
//   const auctionAPI = useAuctipnAPI();

//   const [listings, setListings] = useState([]);
//   const [meta, setMeta] = useState({}); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 14;
//   const location = useLocation();

//   useEffect(() => {
//     const loadListings = async () => {
//       setLoading(true);
//       try {
//         const { listings, meta } = await auctionAPI.getALLListings(currentPage, itemsPerPage, 'created', 'desc');  
//        setListings(listings);
//         setMeta(meta);
//         console.log("listingsData", listings);
//         console.log('meta', meta);
//         console.log('meta.pageCount', meta.pageCount);
//       } catch (error) {
//         console.error("Error loading listings", error);
//         setListings([]);
//       }finally {
//         setLoading(false);
//       }
//     };
//     loadListings();
//   }, [auctionAPI,currentPage]);


//   useEffect(() => {
//     if (location.state?.newListing) {
//       setListings((prev) => [location.state.newListing, ...prev]);
//     }
//   }, [location.state]);


  
//   return (
//     <div className="home-page">

//       {/* Carousel */}
//       <Carousel listings={listings} />

//          {/* Listings Section */}
//          {loading ? (
//         <p>Loading...</p> 
//       ) : listings.length > 0 ? (
//         <div className="listings">
//           {listings.map((listing) => (
//             <ListingCard key={listing.id} listing={listing} />
//           ))}
//         </div>
//       ) : (
//         <p>No listings available.</p> 
//       )}

//       {/* Pagination */}
//       <Pagination
//         listings={listings} 
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         itemsPerPage={itemsPerPage}
//         totalPages={meta.pageCount}
//         onPageChange={(newPage) => setCurrentPage(newPage)}
//       />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/pagination";
import FilterBar from "../components/FilterByTags"; // Import the new FilterBar component
import { useLocation } from "react-router-dom";
import useAuctipnAPI from "../constants/instance";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const {activeTag, setActiveTag, currentPage, setCurrentPage} = useAppContext();
  const auctionAPI = useAuctipnAPI();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [meta, setMeta] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [activeTag, setActiveTag] = useState(null); // State for the selected tag
  const itemsPerPage = 14;
  const location = useLocation();
  // const navigate = useNavigate();

  // Load listings
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        let response;
        if (activeTag) {
          response = await auctionAPI.filterByTagAndActive(activeTag); 
        setFilteredListings(response.data || []);
        setMeta({})  
        } else {
          response = await auctionAPI.getALLListings(
            currentPage,
            itemsPerPage,
            "created",
            "desc"
          );
          setFilteredListings([]);
        }
        const { listings = [], meta = {} } = response || {};
        // const { listings, meta } = response || {};
        setListings(listings);
        setMeta(meta || {});
        console.log("listingsData", listings);
      } catch (error) {
        console.error("Error loading listings", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [auctionAPI, currentPage, activeTag]);

    // Reset page and activeTag when location changes to Home page
    useEffect(() => {
      if (location.pathname === "/") {
        setActiveTag(null); // Reset filter when on home page
        setCurrentPage(1); 
      }
    }, [location.pathname, setActiveTag, setCurrentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  // Handle new listings from location state
  useEffect(() => {
    if (location.state?.newListing) {
      setListings((prev) => [location.state.newListing, ...prev]);
    }
  }, [location.state]);


  const displayedListings = activeTag
  ? filteredListings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  : listings;

  return (
    <div className="home-page">
      {/* Carousel
      <Carousel listings={listings} /> */}

          {/* Carousel */}
          <Carousel listings={displayedListings} />


      {/* Filter Bar */}
      <FilterBar activeTag={activeTag} setActiveTag={setActiveTag} />

      {/* Listings Section */}
      {loading ? (
        <p>Loading...</p>
      ) : displayedListings.length > 0 ? (
        <div className="listings">
          {displayedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}

      {/* Pagination  */}
      {activeTag && (
        <Pagination
          listings={filteredListings}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalPages={Math.ceil(filteredListings.length / itemsPerPage)} // Calculate total pages based on filtered listings
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
      {/* Pagination for all listings, visible when no tag is active */}
      {!activeTag && (
        <Pagination
          listings={listings}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalPages={meta.pageCount || 1} // Use meta.pageCount if available
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
     
    </div>
  );
};

export default Home;

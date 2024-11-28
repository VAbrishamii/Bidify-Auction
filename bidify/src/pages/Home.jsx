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
import Filter from "../components/FilterByTags"; // Import the Filter component
import { useLocation } from "react-router-dom";
import useAuctipnAPI from "../constants/instance";

const Home = () => {
  const auctionAPI = useAuctipnAPI();
  const [listings, setListings] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null); // Track the selected tag
  const itemsPerPage = 14;
  const location = useLocation();

  const tags = ["Decorative", "Art", "Electronics", "Accessories"]; // Categories

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        let data = { listings: [], meta: {} }; 
        if (activeTag) {
          data = await auctionAPI.filterByTagAndActive(activeTag, true); 
          console.log('API data', data);
        } else {
          data = await auctionAPI.getALLListings(
            currentPage,
            itemsPerPage,
            "created",
            "desc"
          ); // Default listings
        }
        console.log('Api data', data);

        const { data: listingData, meta = {} } = data;
        const { listings = [] } = listingData; 

        console.log('fetchetd data', listings);
        setListings(listings);
        setMeta(meta);
      } catch (error) {
        console.error("Error loading listings", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [auctionAPI, currentPage, activeTag]);

    useEffect(() => {
    if (location.state?.newListing) {
      setListings((prev) => [location.state.newListing, ...prev]);
    }
  }, [location.state]);

  const handleFilter = (tag) => {
    console.log('selected tag', tag);
    setActiveTag(tag.toLowerCase()); // Set the selected tag
    setCurrentPage(1); // Reset to the first page when filtering
  };

  return (
    <div className="home-page">
      {/* Carousel */}
      <Carousel listings={listings} />

      {/* Filter Component */}
      <Filter tags={tags} onFilter={handleFilter} />

      {/* Listings Section */}
      {loading ? (
        <p>Loading...</p>
      )  : Array.isArray(listings) && listings.length > 0 ? ( 
        <div className="listings">
          {listings.map((listing) => (
           
            <ListingCard key={listing.id} listing={listing} />
         
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}
      

      {/* Pagination */}
      {!activeTag && (
        <Pagination
          listings={listings}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalPages={meta.pageCount}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

export default Home;

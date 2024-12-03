import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuctionAPI from "../service/AuctionAPI"; 
import ListingCard from "../components/ListingCard";
import Pagination from "../components/pagination";
import { useAppContext } from "../context/AppContext";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); 
  const {searchQuery,setSearchQuery,results, setResults, currentPage, setCurrentPage} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [perPage] = useState(12);
  
const totalPages = Math.ceil(results.length / perPage);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) return; 
      setIsLoading(true);
      const api = new AuctionAPI("https://v2.api.noroff.dev/");
      try {
        const searchResult = await api.searchListings(searchQuery);
        setResults(searchResult.data);
        // setTotalPages(searchResult.totalPages || 1);
      } catch (error) {
        setError("Failed to load search results.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [searchQuery, setResults]);

  const displayedResults = results.slice((currentPage - 1) * perPage, currentPage * perPage);


  return (
    <div >
      <h1 className="items-center justify-center flex text-gray-dark font-semibold"> Search Results for "{searchQuery}"</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="listings">
        {displayedResults.length === 0 ? (
          <p>No results found for "{searchQuery}".</p>
        ) : (
          displayedResults.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(newPage) => setCurrentPage(newPage)} />
    </div>
  );
};

export default SearchResults;

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import AuctionAPI from "../service/AuctionAPI"; 
// import ListingCard from "../components/ListingCard";

// const SearchResults = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("query"); 
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query) return; 
//       setIsLoading(true);
//       const api = new AuctionAPI("https://v2.api.noroff.dev/");
//       try {
//         const searchResult = await api.searchListings(query);
//         setResults(searchResult.data);
//       } catch (error) {
//         setError("Failed to load search results.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchResults();
//   }, [query]);

//   return (
//     <div className="filter-bar">
//       <h1>Search Results for "{query}"</h1>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div className="flex-styled filter-item">
//         {results.length === 0 ? (
//           <p>No results found for "{query}".</p>
//         ) : (
//           results.map((listing) => (
//             <ListingCard key={listing.id} listing={listing} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;
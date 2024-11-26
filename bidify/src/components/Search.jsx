// import React, { useState } from "react";
// import AuctionAPI from "../service/AuctionAPI";
// import { useNavigate } from "react-router-dom";


// const Search = () => {
//     const [query, setQuery] = useState("");
//     const[results, setResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const[error, setError] = useState(null);



//     const handleSearch = async () => {
//         console.log('serach query', query);
//         if(!query) {
//             console.log('search query is empty');//debug
//             return;

//         }

//         const api = new AuctionAPI("https://v2.api.noroff.dev/");
//         setIsLoading(true);
//         setError(null);

//         try {
//             console.log('calling search query', query);//debug
//             const searchResult = await api.searchListings(query);
//             console.log('serach result', searchResult);//debug

//             const filteredResults = searchResult.data.filter(
//                 (listing) =>
//                   listing.title.toLowerCase().includes(query.toLowerCase()) ||
//                   listing.description.toLowerCase().includes(query.toLowerCase())
//               );
//               console.log('filtered results', filteredResults);//debug

//             setResults(searchResult.data);
//         }catch(error){
//             setError(error);
//             console.error("Error searching listings", error);
//         }finally{
//             setIsLoading(false);
//             console.log('search completed');//debug
//         }
//     };

//     return (
//         <div className="relative">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search listings..."
//             className="px-4 py-2 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border w-64"
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute right-2 top-2 text-blue-500"
//             aria-label="Search"
//           >
//             <i className="fas fa-search"></i>
//           </button>
    
//           {/* Loading Spinner */}
//           {isLoading && <p className="text-gray-500 mt-2">Searching...</p>}
    
//           {/* Error Message */}
//           {error && <p className="text-red-500 mt-2">{error}</p>}
    
//           {/* Search Results */}
//           {results.length > 0 && (
//   <div className="mt-4 bg-white shadow-lg rounded-lg max-h-64 overflow-auto">
//     {results.map((listing) => (
//       <div
//         key={listing.id || Math.random()} // Ensure a unique key for React
//         className="p-2 border-b"
//       >
//         <h3 className="text-lg font-semibold">
//           <a
//             href={`/listings/${listing.id}`}
//             className="hover:text-blue-500"
//           >
//             {listing.title || "Untitled"}
//           </a>
//         </h3>
//         <p className="text-sm text-gray-600">
//           {listing.description || "No description available."}
//         </p>
//       </div>
//     ))}
//   </div>
// )}
       
    
//           {/* No Results */}
//           {!isLoading && query && results.length === 0 && (
//             <p className="text-gray-500 mt-2">No results found.</p>
//           )}
//         </div>
//       );
//     };
    


// export default Search;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
// import AuctionAPI from "../service/AuctionAPI";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearch = async () => {
    if (!query) return; // Only search if there's a query
    // Navigate to the search results page with the query parameter
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search listings..."
        className="px-4 py-2 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border w-64"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-2 text-blue-500"
        aria-label="Search"
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuctionAPI from "../service/AuctionAPI"; 
import ListingCard from "../components/ListingCard";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Get the query from the URL
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // If there's no query, don't fetch
      setIsLoading(true);
      const api = new AuctionAPI("https://v2.api.noroff.dev/");
      try {
        const searchResult = await api.searchListings(query);
        setResults(searchResult.data);
      } catch (error) {
        setError("Failed to load search results.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]); // Re-run the fetch when the query changes

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {results.length === 0 ? (
          <p>No results found for "{query}".</p>
        ) : (
          results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
            // <div key={listing.id} className="p-4 border-b">
            //   <h3 className="text-lg font-semibold">
            //     <a href={`/listings/${listing.id}`} className="hover:text-blue-500">
            //       {listing.title}
            //     </a>
            //   </h3>
            //   <p className="text-sm text-gray-600">{listing.description}</p>
            // </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;

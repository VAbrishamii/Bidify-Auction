import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuctionAPI from "../service/AuctionAPI"; 
import ListingCard from "../components/ListingCard";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); 
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; 
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
  }, [query]);

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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;

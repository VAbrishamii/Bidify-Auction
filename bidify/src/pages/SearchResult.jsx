import { useState, useEffect } from "react";
import AuctionAPI from "../service/AuctionAPI";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/pagination";
import { useAppContext } from "../context/AppContext";
/**
 * SearchResults component that displays the results of a search query.
 * It fetches search results based on the user's query,
 * handles pagination,
 * and displays the results in a grid format.
 */
const SearchResults = () => {
  const { searchQuery, results, setResults, currentPage, setCurrentPage } =
    useAppContext();
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
      } catch (error) {
        setError("Failed to load search results.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [searchQuery, setResults]);

  const displayedResults = results.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div>
      <h1 className="items-center justify-center flex text-gray-dark font-semibold">
        {" "}
        Search Results for "{searchQuery}"
      </h1>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default SearchResults;

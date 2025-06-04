import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
/**
 * Search component provides a search bar for users to find listings.
 * It captures the search query, updates the context, and navigates to the search results page.
 * It uses React hooks for state management and navigation.
 * The search bar includes an input field and a search button with an icon.
 */
const Search = () => {
  const { setSearchQuery, setCurrentPage } = useAppContext();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;
    setSearchQuery(query);
    setCurrentPage(1);
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="relative search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search listings..."
        aria-label="Search"
      />
      <button onClick={handleSearch} aria-label="Search">
        <MdSearch className="search-icon" />
      </button>
    </div>
  );
};

export default Search;

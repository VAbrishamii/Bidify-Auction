import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { useAppContext } from "../context/AppContext";


const Search = () => {
  // const [query, setQuery] = useState("");
  const {setSearchQuery, setCurrentPage} = useAppContext();
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
      //   className="px-4 py-2 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 border w-96 ring-opacity-50"
      />
      <button
        onClick={handleSearch}
        aria-label="Search"
      >
        <MdSearch className="search-icon" />
      </button>
    </div>
  );
};

export default Search;


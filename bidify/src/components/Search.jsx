import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 
  const handleSearch = async () => {
    if (!query) return; 
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

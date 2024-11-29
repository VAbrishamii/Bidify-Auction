import React from "react";

const FilterBar = ({ activeTag, setActiveTag }) => {
  const tags = ["art", "decorative", "electronics", "accessories"];

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag)); // Toggle the tag filter
  };

  return (
    <div className="filter-bar flex justify-center space-x-4 my-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`py-2 px-4 text-white font-semibold rounded-md ${
            activeTag === tag
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)} {/* Capitalize the tag */}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

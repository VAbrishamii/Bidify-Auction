import React from "react";

const FilterBar = ({ activeTag, setActiveTag }) => {
  const tags = [
   {name: "art", image: "/art.jpg"},
   {name: "decorative", image: "/decorative.jpg"},
   {name: "electronics", image: "/electronics.jpg"},
   {name: "accessories", image: "/accessories.jpg"},];

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag)); // Toggle the tag filter
  };

return (
  <div className="filter-bar">
    {tags.map((tag) => (
      <div key={tag.name} className="flex-styled filter-item">
        <button
          className={`filter-btn ${
            activeTag === tag.name ? "active" : "" 
      
          }`}
          style={{ backgroundImage: `url(${tag.image})` }}
          onClick={() => handleTagClick(tag.name)}
        >
         <span
            className={`filter-text ${activeTag === tag.name ? "active-text" : ""}`}
          >
            {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
          </span>
          </button>
      </div>
    ))}
  </div>
);
};

export default FilterBar;

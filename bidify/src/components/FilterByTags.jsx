import React from "react";

const FilterBar = ({ activeTag, setActiveTag }) => {
  const tags = [
    { name: "art", image: `${process.env.PUBLIC_URL}/art.jpg` },
    { name: "decorative", image: `${process.env.PUBLIC_URL}/decorative.jpg` },
    { name: "electronics", image: `${process.env.PUBLIC_URL}/electronics.jpg` },
    { name: "accessories", image: `${process.env.PUBLIC_URL}/accessories.jpg` },
  ];

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="filter-bar">
      {tags.map((tag) => (
        <div key={tag.name} className="flex-styled filter-item">
          <button
            aria-label="Filter by tag"
            className={`filter-btn ${activeTag === tag.name ? "active" : ""}`}
            style={{ backgroundImage: `url(${tag.image})` }}
            onClick={() => handleTagClick(tag.name)}>
            <span
              className={`filter-text ${
                activeTag === tag.name ? "active-text" : ""
              }`}>
              {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;

import React from "react";

const Filter = ({ tags, onFilter }) => {
  return (
    <div className="filter-container">
      {tags.map((tag) => (
        <button
          key={tag}
          className="filter-button"
          onClick={() => onFilter(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Filter;

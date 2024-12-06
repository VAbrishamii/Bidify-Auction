import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        aria-label="Previous"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}>
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        aria-label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';

 const pagination = ({listings, currentPage, setCurrentPage, itemsPerPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listings.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(listings.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === Math.ceil(listings.length / itemsPerPage)}>
            Next
          </button>
        </div>
      );


 };
 export default pagination;
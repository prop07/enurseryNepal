import React, { useState, useEffect } from "react";

const pageSize = 5; // Number of items per page

const Pagination = () => {
  const [items, setItems] = useState([]); // List of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Simulating fetching data from an API
  useEffect(() => {
    // Fetch data here or set it manually
    const data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      { id: 7, name: "Item 7" },
      { id: 8, name: "Item 8" },
      { id: 9, name: "Item 9" },
      { id: 10, name: "Item 10" },
      { id: 11, name: "Item 11" },
      { id: 12, name: "Item 12" },
    ];

    setItems(data);
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / pageSize);

  // Get the items to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Pagination</h1>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
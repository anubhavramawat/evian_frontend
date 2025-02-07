import React from "react";

const SearchBar = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-3/4 md:w-1/3">
      <input
        type="text"
        placeholder="Search here..."
        className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-800 text-white"
      />
    </div>
  );
};

export default SearchBar;
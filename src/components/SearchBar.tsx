import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/searchBar.css";

const SearchBar = () => {
  // Accessing dispatch from the AppContext to dispatch actions
  const { dispatch } = useContext(AppContext);

  // Handler to update the search term in the global state
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search objects..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

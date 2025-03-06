import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/searchBar.css";

const SearchBar = () => {
  const { dispatch } = useContext(AppContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
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

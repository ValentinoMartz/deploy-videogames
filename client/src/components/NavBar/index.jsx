import React from "react";
import { Link } from "react-router-dom";
import FilteredBy from "../FilterBy";

import SearchBar from "../SearchBar";
import "./NavBar.css";

function NavBar({ setCurrentPage }) {
  return (
    <div className="div_nav">
      <Link to="/home">
        <button className="nav_button">Home</button>
      </Link>

      <Link to="/createvideogame">
        <button className="nav_button">Create Videogame</button>{" "}
      </Link>
      <div className="div_filters">
        <FilteredBy setCurrentPage={setCurrentPage} />
        <SearchBar />
      </div>
    </div>
  );
}

export default NavBar;

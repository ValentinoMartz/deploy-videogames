import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory(); //estudiar
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getVideogameName(name));
    setName("");
    history.push("/home");
  };
  return (
    <div className="div_search">
      <input
        className="input_search"
        onChange={handleInputChange}
        type="text"
        placeholder="Search by name. . ."
        value={name}
      />
      <button className="button_search" onClick={handleSubmit} type="submit">
        Search
      </button>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
export default function Card({ id, name, genres, img, rating }) {
  return (
    <div className="card">
      <h2>
        <Link to={`/videogame/${id}`}> {name}</Link>
      </h2>
      <img src={img} alt={name} width="100%" heigth="100%" />
      {<h4 className="genres">Genres: {genres && genres.join(" ")}</h4>}
      <h5>Rating: {rating}</h5>
    </div>
  );
}

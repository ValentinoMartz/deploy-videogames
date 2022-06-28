import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FilterBy.css";
import {
  filterByGenre,
  filterByOrgin,
  getAllGenres,
  orderByAZ,
  orderByRating,
} from "../../redux/actions";

export default function FilteredBy({ setCurrentPage }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleOrigin = (e) => {
    console.log(e.target.value);
    setCurrentPage(1);
    dispatch(filterByOrgin(e.target.value));
  };
  const handleGenres = (e) => {
    console.log(e.target.value);
    setCurrentPage(1);
    dispatch(filterByGenre(e.target.value));
  };
  const handleRating = (e) => {
    console.log(e.target.value);
    setCurrentPage(1);
    dispatch(orderByRating(e.target.value));
  };

  const handleAZ = (e) => {
    console.log(e.target.value);
    setCurrentPage(1);
    dispatch(orderByAZ(e.target.value));
  };
  return (
    <div className="div_filter">
      <div className="div_origin">
        <select name="" id="" onChange={handleOrigin} className="select_filter">
          <option value="">Origin</option>
          <option value="all">All</option>

          <option value="DB">Created</option>

          <option value="API">Api</option>
        </select>
      </div>

      <div className="div_genres">
        <select name="" id="" onChange={handleGenres} className="select_filter">
          <option value="">Genres</option>
          <option value="all">All</option>
          {genres &&
            genres.map((g) => (
              <option key={g.name} name={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
        </select>
      </div>

      <div className="div_rating">
        <select name="" id="" onChange={handleRating} className="select_filter">
          <option value="">Rating</option>
          <option value="all">All</option>
          <option value="asc">+ Rating</option>
          <option value="desc">- Rating</option>
        </select>
      </div>

      <div className="div_az">
        <select name="" id="" onChange={handleAZ} className="select_filter">
          <option value="">ABC</option>
          <option value="all">all</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  );
}

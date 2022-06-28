import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearState, getVideogameID } from "../../redux/actions";
import NavBar from "../NavBar";
import "./VideogameDetails.css";

function VideogameDetails() {
  const { id } = useParams(); //5555555555555555555555
  const dispatch = useDispatch();

  const details = useSelector((state) => state.videogameDetails);

  useEffect(() => {
    dispatch(getVideogameID(id));
    return () => {
      //componen did unmount
      dispatch(clearState()); // limpio el state de details
    };
  }, [dispatch, id]);

  console.log("Entrando a DETAILS");
  return (
    <div className="div_index">
      <div className="div_nav">
        <NavBar />
      </div>
      <div className="div_detail">
        {details.name ? (
          <div>
            <h1>{details.name} details:</h1>
            <div className="img_div">
              <img
                className="img_detail"
                src={details.img} // aca no renderiza las creadas
                alt="Not Found"
                /* width="40%"
                heigth="40%" */
              />
            </div>
            <div className="div_boxes">
              <div className="description_">
                <h2>Description:</h2>
                <h5>{details.description}</h5>
              </div>

              <div className="others_">
                <h4>Released: {details.released}</h4>

                <h4>Rating: {details.rating}</h4>

                <h4>Platforms: {details.platforms}</h4>

                <h4>Genres: {details.genres}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="div_loading_detail">
            {/* <h1 className="div_h1"> Loading game</h1> */}
            <img src="https://i.gifer.com/wau.gif" className="img_loading" />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideogameDetails;

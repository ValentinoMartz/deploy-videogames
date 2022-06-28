import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_ID,
  GET_ALL_GENRES,
  GET_VIDEOGAME_NAME,
  CLEAR_STATE,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRE,
  ORDER_BY_RATING,
  ORDER_BY_AZ,
} from "./actionTypes";
import axios from "axios";

const URL = "https://videogames-valentinomartinez.herokuapp.com/";
export const getAllVideogames = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get(URL + `/videogames`);
      console.log("getAllVideogames ");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: result.data,
      });
    } catch (e) {
      console.log("Error from catch getAllVideogames " + e);
    }
  };
};
export const getVideogameName = (name) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(URL + `/videogames?name=${name}`);
      console.log("getVideogameName");

      return dispatch({
        type: GET_VIDEOGAME_NAME,
        payload: result.data,
      });
    } catch (e) {
      alert(`There is no videogame with the name ${name} in database`);
    }
  };
};

export const getVideogameID = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(URL + `/videogame/${id}`);
      console.log("getVideogameID");
      return dispatch({
        type: GET_VIDEOGAME_ID,
        payload: result.data,
      });
    } catch (e) {
      console.log("Error from catch getVideogameID " + e);
    }
  };
};

export const getAllGenres = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get(URL + `/genres`);
      console.log("getAllGenres");
      return dispatch({
        type: GET_ALL_GENRES,
        payload: result.data,
      });
    } catch (e) {
      console.log("Error from catch getAllGenres " + e);
    }
  };
};
//
export const postVideogame = (payload) => {
  return async function () {
    try {
      return await axios.post(URL + `/videogame`, payload);
    } catch (e) {
      alert("Error creating the game ", e);
    }
  };
};
export const clearState = () => {
  console.log("clearState");
  return {
    type: CLEAR_STATE,
  };
};

export function filterByOrgin(filter) {
  return async function (dispatch) {
    console.log("filterByOrigin");
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: filter,
    });
  };
}
export function filterByGenre(filter) {
  return async function (dispatch) {
    console.log("filterByGenre");
    dispatch({
      type: FILTER_BY_GENRE,
      payload: filter,
    });
  };
}
export function orderByRating(order) {
  return async function (dispatch) {
    console.log("orderByRating");
    dispatch({
      type: ORDER_BY_RATING,
      payload: order,
    });
  };
}
export function orderByAZ(order) {
  return async function (dispatch) {
    console.log("orderByAZ");
    dispatch({
      type: ORDER_BY_AZ,
      payload: order,
    });
  };
}

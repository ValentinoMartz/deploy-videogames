import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  GET_VIDEOGAME_ID,
  GET_VIDEOGAME_NAME,
  POST_VIDEOGAME,
  CLEAR_STATE,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRE,
  ORDER_BY_RATING,
  ORDER_BY_AZ,
} from "../actions/actionTypes";

const initialState = {
  videogames: [],
  videogameDetails: [],
  genres: [],
  auxVideogames: [], // guardo todo aca para usarlo
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        auxVideogames: payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case GET_VIDEOGAME_ID:
      return {
        ...state,
        videogameDetails: payload,
      };
    case GET_VIDEOGAME_NAME:
      return {
        ...state,
        videogames: payload,
      };

    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case CLEAR_STATE:
      return {
        ...state,
        videogameDetails: [],
      };
    case FILTER_BY_ORIGIN:
      if (payload === "all") {
        return {
          ...state,
          videogames: state.auxVideogames,
        };
      }
      if (payload === "DB") {
        let arr = [];
        state.auxVideogames.forEach((e) => {
          if (typeof e.id !== "number") {
            arr.push(e);
          }
        });

        if (arr.length === 0) {
          alert(`No videogames were created yet`);
          return {
            ...state,
            videogames: state.auxVideogames,
          };
        }
        return {
          ...state,
          videogames: arr,
        };
      }
      if (payload === "API") {
        return {
          ...state,
          videogames: state.auxVideogames.filter(
            (g) => typeof g.id === "number"
          ),
        };
      }
    case FILTER_BY_GENRE:
      let genreFilter = [];
      if (payload === "all") {
        genreFilter = state.auxVideogames;
      } else {
        genreFilter = state.auxVideogames.filter((e) =>
          e.genres.includes(payload)
        );
      }
      if (genreFilter.length === 0) {
        alert(`No videogames found for ${payload} genre`);
      } else {
        return {
          ...state,
          videogames: genreFilter,
        };
      }
    case ORDER_BY_RATING:
      if (payload === "all") {
        return {
          ...state,
          videogames: state.auxVideogames,
        };
      }
      if (payload === "asc") {
        return {
          ...state,
          videogames: [...state.auxVideogames].sort(function (prev, next) {
            return next.rating - prev.rating;
          }),
        };
      }
      if (payload === "desc") {
        return {
          ...state,
          videogames: [...state.auxVideogames].sort(function (prev, next) {
            return prev.rating - next.rating;
          }),
        };
      }
    case ORDER_BY_AZ:
      if (payload === "all") {
        return {
          ...state,
          videogames: state.auxVideogames,
        };
      }
      if (payload === "a-z") {
        return {
          ...state,
          videogames: [...state.auxVideogames].sort((prev, next) => {
            if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
            if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
            return 0;
          }),
        };
      }
      if (payload === "z-a") {
        return {
          ...state,
          videogames: [...state.auxVideogames].sort((prev, next) => {
            if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
            if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
            return 0;
          }),
        };
      }
    default:
      return state;
  }
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postVideogame } from "../../redux/actions";
import NavBar from "../NavBar";
import "./CreateVideoGame.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (input.name.length < 3) {
    errors.name = "Name is too short";
  }
  if (input.name.length > 15) {
    errors.name = "Name is too long";
  }
  if (!/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/.test(input.name)) {
    errors.name = "Invalid name characters";
  }
  if (!input.description) {
    errors.description = "Description is required";
  }
  if (input.description.length < 5) {
    errors.description = "Description is too short";
  }

  //!/^[1-5]$/.test(input.rating)
  if (!input.rating || input.rating < 0 || input.rating > 5) {
    errors.rating = "Rating must be between 0-5";
  }
  if (!input.released) {
    errors.released = "Released is required";
  } else if (
    !/(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(
      input.released
    )
  ) {
    errors.released = "Released date incorrect";
  }
  /* if(input.rating.split()) */
  if (!input.platforms.length) {
    errors.platforms = "Platform is required";
  }

  if (!input.genres.length) {
    errors.genres = "Genres is required";
  }
  if (input.genres.length > 3) {
    errors.genres = "Too match genres";
  }
  return errors;
}

export default function CreateVideoGame() {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input.name);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlePlatforms = (e) => {
    let platformChecked = input.platforms.includes(e.target.name);
    console.log(platformChecked);
    if (e.target.checked && !platformChecked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.name],
      });
      setErrors(
        validate({
          ...input,
          platforms: e.target.name,
        })
      );
    } else {
      setInput({
        ...input,
        platforms: input.platforms.filter((g) => g !== e.target.name),
      });
      setErrors(
        validate({
          ...input,
          platforms: input.platforms.filter((g) => g !== e.target.name),
        })
      );
    }
  };
  const handleGenres = (e) => {
    let genreSelected = input.genres.includes(e.target.value);
    if (!genreSelected && input.genres.length < 3) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          genres: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        genres: input.genres.filter((g) => g !== e.target.value),
      });
      setErrors(
        validate({
          ...input,
          genres: input.genres.filter((g) => g !== e.target.value),
        })
      );
    }
  };
  const handleSubmit = (e) => {
    if (!input.rating || input.rating < 0 || input.rating > 5) {
      return alert("Rating must be a number between 0-5");
    } //5555555555555555555555
    e.preventDefault();
    dispatch(postVideogame(input));
    alert(`Game ${input.name} has been created!`);
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    history.push("/home");
  };
  return (
    <div className="form_div">
      <NavBar />
      <div className="create_div">
        <h2 className="h2_">Create videogame: </h2>

        <form onSubmit={handleSubmit}>
          <div className="input_div">
            <label>Game name:</label>
            <input
              onChange={handleOnChange}
              type="text"
              name="name"
              placeholder="Write a name"
              value={input.name}
              className="input_input"
            />
            {errors.name && <p className="errors">{errors.name}</p>}
          </div>
          <div className="input_div">
            <label>Genres:</label>
            <select onChange={handleGenres} className="input_select">
              {genres &&
                genres.map((g) => (
                  <option key={g.name} name={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
            </select>
            {
              <div>
                {input.genres.map((a) => {
                  return (
                    <span key={a}>
                      {a}
                      <button
                        value={a}
                        onClick={handleGenres}
                        className="x_button"
                      >
                        x
                      </button>
                    </span>
                  );
                })}
              </div>
            }

            {errors.genres && <p className="errors">{errors.genres}</p>}
          </div>
          <div className="input_div">
            <label>Description: </label>
            <textarea
              onChange={handleOnChange}
              type="text"
              name="description"
              placeholder="Put a description"
              value={input.description}
              className="input_input"
            />
            {errors.description && (
              <p className="errors">{errors.description}</p>
            )}
          </div>

          <div className="input_div">
            <label>Released date:</label>
            <input
              onChange={handleOnChange}
              type="date"
              name="released"
              value={input.released}
              className="input_input"
            />
            {errors.released && <p className="errors">{errors.released}</p>}
          </div>

          <div className="input_div">
            <label>Rating:</label>
            <input
              onChange={handleOnChange}
              type="number"
              name="rating"
              /*  min="0.1" // da lugar a la rompicion
              max="5.0" */
              value={input.rating}
              className="input_input"
            />
            {errors.rating && <p className="errors">{errors.rating}</p>}
          </div>
          <div onChange={handlePlatforms} className="input_div">
            <label>Platforms:</label>
            <br /> {/* acomodar luego */}
            <label>PC</label>
            <input type="checkbox" name="PC" value={input.platforms} />
            <label>PlayStation</label>
            <input type="checkbox" name="PlayStation" value={input.platforms} />
            <label>X-Box</label>
            <input type="checkbox" name="X-Box" value={input.platforms} />
            <label>Android</label>
            <input type="checkbox" name="Android" value={input.platforms} />
            <label>Apple</label>
            <input type="checkbox" name="Apple" value={input.platforms} />
          </div>
          {errors.platforms && <p className="errors">{errors.platforms}</p>}

          {errors.name || // errors || !input
          errors.rating ||
          errors.description ||
          errors.platforms ||
          errors.genres ||
          !input.name.length ||
          !input.genres.length ||
          !input.platforms.length ||
          !input.rating.length ||
          !input.released.length ? (
            <p className="errors">Form must be completed!</p>
          ) : (
            <button type="submit" className="button_sub">
              Create Game!
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

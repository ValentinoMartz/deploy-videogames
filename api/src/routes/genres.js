const { API_KEY } = process.env;

const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Videogames, Genres } = require("../db");

router.get("/", async (req, res) => {
  try {
    //si estan en la db los traigo de ahi
    const genresDB = await Genres.findAll();
    if (genresDB.length) {
      return res.status(200).json(genresDB);
    }
    //sino desde la api
    let genresAll = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    let genres = genresAll.data.results.map((e) => ({
      id: e.id,
      name: e.name,
    }));

    genres.forEach(
      async (e) =>
        await Genres.findOrCreate({
          where: {
            name: e.name,
            id: e.id,
          },
        })
    );
    /* const genresReady = genres.map((e) => {
      console.log(e.name);
      return {
        id: e.id,
        name: e.name,
      };
    }); */
    return res.status(200).json(genres);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;

require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Videogames, Genres } = require("../db");

//Llamo a la api
const callApi = async () => {
  const api = await axios.get(`http://api.rawg.io/api/games?key=${API_KEY}`);

  const page2 = await axios.get(
    `http://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const page3 = await axios.get(
    `http://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const page4 = await axios.get(
    `http://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const page5 = await axios.get(
    `http://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );

  let apiConcat = await api.data.results.concat(
    page2.data.results,
    page3.data.results,
    page4.data.results,
    page5.data.results
  );

  let apiPromises = await Promise.all(apiConcat);

  //mapeo solo la informacion que necesito de cada videogame
  const infoApi = await apiPromises.map((e) => {
    return {
      id: e.id,
      name: e.name, //ver bien que devuelvo
      rating: e.rating,
      released: e.released,
      img: e.background_image,
      genres: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform.name),
    };
  });
  //devuelvo el mapeo
  return infoApi;
};
//llamo a la DB
const callDB = async () => {
  //traigo todos los videogames
  let dbReturn = await Videogames.findAll({
    include: {
      //y tambien los generos
      model: Genres,
      //traigo la propiedad name
      attributes: ["name"],
      // a traves de los atributos
      through: {
        attributes: [],
      },
    },
  });
  console.log(dbReturn);
  dbReturn = JSON.stringify(dbReturn);
  console.log(dbReturn);
  dbReturn = JSON.parse(dbReturn);
  console.log(dbReturn);

  dbReturn = dbReturn.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );
  console.log(dbReturn);
  return dbReturn;
};

const callAll = async () => {
  const dbData = await callDB();
  const apiData = await callApi();
  const allData = dbData.concat(apiData);
  return allData;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  //guardo todos los resultados
  let gamesAll = await callAll();
  try {
    if (name) {
      let gameQuery = await gamesAll.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      if (!gameQuery.length) {
        return res
          .status(404)
          .send(`Videogame not found in database "${name}"`);
      }
      let resultsQuery = gameQuery.splice(0, 15);
      return res.status(200).json(resultsQuery);
    }

    return res.status(200).json(gamesAll);
  } catch (e) {
    return res.status(400).json("CATCH DEL GET ALL");
  }
});

module.exports = router;

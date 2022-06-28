const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Videogames, Genres } = require("../db");

/* [ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados 
https://api.rawg.io/api/games/40?key=a40c758952c0431b971a827eac643ca9
*/

//La fuerza de tu envidia es el motor de mi velocidad

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  if (!id.includes("-")) {
    //cambiar en un futuro
    try {
      const api = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let apiUrl = api.data;
      const idApi = {
        id: apiUrl.id,
        name: apiUrl.name,
        description: apiUrl.description_raw,
        released: apiUrl.released,
        rating: apiUrl.rating,
        platforms: apiUrl.platforms.map((e) => e.platform.name).join(", "),
        img: apiUrl.background_image,
        genres: apiUrl.genres.map((e) => e.name).join(", "),
      };
      console.log("Hi from res.json api");
      res.status(200).json(idApi);
    } catch (e) {
      res.status(404).send("ERROR FROM CATCH API" + e);
    }
  } else {
    try {
      let idDB = await Videogames.findByPk(id, { include: Genres });

      const idDBData = {
        id: idDB.id,
        name: idDB.name,
        description: idDB.description,
        released: idDB.released,
        rating: idDB.rating,
        platforms: idDB.platforms.map((e) => e).join(", "),
        img: idDB.img,
        genres: idDB.genres.map((e) => e.name).join(", "),
      };

      console.log("Hi from res.json DB");
      res.status(200).json(idDBData);
    } catch (e) {
      res.status(404).send("ERROR FROM CATCH DB " + e);
    }
  }
});

router.post("/", async (req, res) => {
  let { name, description, released, rating, platforms, genres, img } =
    req.body;
  //validar

  if (!name || !description || !platforms) {
    //corroborado desde el front
    res.send("ERRRRRRROR");
  }
  if (!img) {
    img =
      "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg";
  }
  try {
    // find or create devuelve un obj con 2 propiedades
    //game si lo encuentra ---> es una referencia
    //created si lo creó o no, true or false

    const [game, created] = await Videogames.findOrCreate({
      where: {
        name,
        description,
        released,
        rating,
        platforms,
        img,
      },
    });
    console.log("CREATED? ", created);
    let genre = await Genres.findAll({ where: { name: genres } });
    console.log("GENREEEEEEEEEEEEEEEE ", genre);

    await game.addGenres(genre);

    res.status(200).json(game);
  } catch (e) {
    res.status(400).json("ERROR FROM CATCH POST: " + e); // ver bien esto
    //next(e);
  }
});

module.exports = router;

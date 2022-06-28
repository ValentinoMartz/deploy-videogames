import React, { useEffect, useState } from "react"; //  useState va aca. . .
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import "./Home.css";
import Card from "../Card";
import NavBar from "../NavBar";
import Pagination from "../Pagination";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1); // pagina actual
  const gamesPerPage = 15; // cantidad de juegos por pagina
  const indexLastGame = currentPage * gamesPerPage; // indice del ultimo juego
  const indexFirstGame = indexLastGame - gamesPerPage; // indice del primero
  const currentGames = allGames.slice(indexFirstGame, indexLastGame); // los juegos actuales

  const pagination = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  console.log("HOME");

  return (
    <div className="home_div">
      <NavBar setCurrentPage={setCurrentPage} />

      <div>
        <Pagination
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>

      <div className="div_card">
        {currentGames.length !== 0 ? (
          currentGames.map((e) => (
            <Card
              key={e.id}
              name={e.name}
              img={e.img}
              genres={e.genres}
              id={e.id}
              rating={e.rating}
            />
          ))
        ) : (
          <div className="div_loading">
            <h1 className="div_h1"> Loading page</h1>
            <img src="https://i.gifer.com/f9D.gif" className="img_loading" />
          </div>
        )}
      </div>
      <div>
        <Pagination
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
export default Home;

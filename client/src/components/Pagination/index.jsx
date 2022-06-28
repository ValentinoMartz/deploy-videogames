import React from "react";
import style from "./Pagination.module.css";
export default function Pagination({
  gamesPerPage,
  allGames,
  pagination,
  currentPage,
}) {
  //                  cuenta desde el primero
  const pageNumbers = []; // cero ya lo cuenta [1 , 2, 3, 4]

  for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div>
      <div className={style.paginado}>
        {currentPage < 2 ? null : ( //1
          <button
            onClick={() => pagination(currentPage - 1)}
            className={style.prev}
          >
            prev
          </button>
        )}

        {pageNumbers &&
          pageNumbers.map((e) => (
            <div key={e} className={style.number} onClick={() => pagination(e)}>
              {e}
            </div>
          ))}
        {currentPage > pageNumbers.length - 1 ? null : (
          <button
            onClick={() => pagination(currentPage + 1)}
            className={style.prev}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}

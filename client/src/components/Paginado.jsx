import React from "react";
import Style from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={Style.navbar}>
        <div className={Style.meme1}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <div className="number" key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </div>
            ))}
        </div>
      </ul>
    </nav>
  );
}

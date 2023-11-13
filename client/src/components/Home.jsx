//React
import React from "react";
import { Link } from "react-router-dom";
//Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Actions
import {
  getPokemons,
  getTypes,
  filterCreated,
  orderByName,
  orderByAttack,
  filterPerTypes,
  getAllPokemons,
} from "../actions";
//Components
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
//Styles
import Style from "./Home.module.css";
import Style2 from "./SearchBar.module.css";
//img
import AshCrying from "../ashCraying.jpg";
import loading from '../assets/loading.gif'

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const error = useSelector((state) => state.error);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage; // en un principio es 12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // esto es 0
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
  }

  function handleFilterPerTypes(e) {
    dispatch(filterPerTypes(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={Style.homecss}>
      <div className={Style.container}>
        <div className={Style.filter1}>
          <div className={Style.filter2}>
            <select
              className={Style.select1}
              onChange={(e) => handleOrderByName(e)}
            >
              <option value="All">Alphabetically</option>
              <option value="asc">A-Z</option>
              <option value="des">Z-A</option>
            </select>
            <select
              className={Style.select1}
              onChange={(e) => handleOrderByAttack(e)}
            >
              <option value="All">Attack Rank</option>
              <option value="atk<">Highest Attack</option>
              <option value="atk>">Lower Attack</option>
            </select>
            <select
              className={Style.select1}
              onChange={(e) => handleFilterPerTypes(e)}
            >
              <option value="All types">Types</option>
              {allTypes?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <select
              className={Style.select1}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">Origin</option>
              <option value="api">Official</option>
              <option value="created">Created</option>
            </select>
            <div className={Style2.buttonPos}>
              <Link to="/pokemons">
                <button className={Style2.button1}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>Create</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={Style.home3}>
          <div>
            <div className={Style.back1}>
              <div className={Style2.searchBar1}>
                <SearchBar />
                <div className={Style.but1}>
                  <button onClick={(e) => handleClick(e)} className={Style.but}>
                    Reload
                  </button>
                </div>
              </div>
            </div>
            <div className={Style2.paginado1}>
              <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
              />
            </div>
          </div>
          <div className={Style.home2}>
            {/* {currentPokemons?.map((e) => {
              return (
                <div>
                  <div key={e.id}>
                    <Link to={"/pokemons/" + e.id}>
                      <Card
                        Types={e.Types}
                        name={e.name}
                        image={e.img}
                        glimmeryImg={e.glimmeryImg}
                        id={e.id}
                        key={e.id}
                      />
                    </Link>
                  </div>
                </div>
              );
            })} */}
            {allPokemons.length > 0 && !error && (
              <div className={Style.LoadingContainer}>
                <img
                  src={loading}
                  alt="Not found"
                  className={Style.Snorlax}
                ></img>
                <div className={Style.Loading}>Loading...</div>
              </div>
            )}
          </div>
          {error && error === "filter_types error" && (
            <div className={Style.errorContainer}>
              <div className={Style.errors1}>
                Ups! No Pokemon found with that type
              </div>
              {/* <div className={Style.backError}>131231231 </div> */}
              <img src={AshCrying} alt="Not found" className={Style.Ash}></img>
            </div>
          )}
          {error && error === "No pokemon under the name:" && (
            <div className={Style.errorContainer}>
              <div className={Style.errors1}>
                Ups! No Pokemon found with that name
              </div>
              <img src={AshCrying} alt="Not found" className={Style.Ash}></img>
            </div>
          )}
          {error && error === "No pokemons created" && (
            <div className={Style.errorContainer}>
              <div className={Style.errors1}>There are no Pokemon created</div>
              <img src={AshCrying} alt="Not found" className={Style.Ash}></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

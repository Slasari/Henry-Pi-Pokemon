import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import Style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(name === "" || name[0] === " ") alert('Write the name of a Pokemon to search for it')
    else dispatch(getNamePokemons(name));
    setName("");
  }

  return (
    <form>
      <input
        className={Style.input1}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
        value={name}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={Style.btn}
      >
        Search
      </button>
    </form>
  );
}

import React from "react";
import Style from "./Card.module.css";

export default function PokeCard({ name, image, Types, glimmeryImg }) {
  return (
    <div className={Style.card}>
      <div className={Style.img_container}>
        <div className={Style.img}></div>
        <div className={Style.description2}>
          <span className={Style.title}>{name}</span>
        </div>
        <div className={Style.img_div}>
          <img
            alt="asd"
            className={Style.imgpokemon}
            style={{ position: "relative" }}
            src={image}
            width="200px"
          />
          <img
            className={Style.img_shiny}
            src={glimmeryImg}
            width="200px"
            alt="Not found"
          ></img>
        </div>
        <div className={Style.description}>
          <span className={Style.title}>
            {Types[0].name}

            {Types[1] && "/" + Types[1].name}
          </span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, DeletePokemon } from "../actions/index";
import { useEffect, useState } from "react";
import Style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  const myPokemon = useSelector((state) => state.detail);

  
  return (
    <div>
      <div className={Style.background1}></div>
      <div className={Style.div2}>
        <div>
          <Link to="/home">
            <button className={Style.but}>Back</button>
          </Link>
        </div>
        {myPokemon && (
          <div className={Style.div1}>
            <form className={Style.letra1}>
              {myPokemon.createdInDb && (
                <div>
                  <a
                    type="button"
                    className={Style.delete}
                    href="/home"
                    onClick={() => {
                      dispatch(DeletePokemon(id));
                      alert("This Pokemon was successfully deleted");
                    }}
                  >
                    {" "}
                    x
                  </a>
                </div>
              )}
              <div className={Style.letra4}>
                <h1 className={Style.letraID}>{myPokemon.id}</h1>
              </div>
              <h1 className={Style.letra2}>{myPokemon.name}</h1>
              <img
                src={myPokemon.img}
                alt="img not found"
                width="200px"
                height="250px"
              ></img>
              <img
                src={myPokemon.glimmeryImg}
                alt="img not found"
                width="200px"
                height="250px"
              ></img>
              <div className={Style.letra5}>
                {myPokemon && myPokemon.Types && (
                  <h1 className={Style.letra2}>{myPokemon?.Types[0].name}</h1>
                )}
                {myPokemon && myPokemon.Types && myPokemon.Types[1] && (
                  <h1 className={Style.letra2}>/{myPokemon?.Types[1].name}</h1>
                )}
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.hp}>hp</h1>
                <h1>{myPokemon.hp}</h1>
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.atk}>atk</h1>
                <h1 className={Style.letra3}>{myPokemon.atk}</h1>
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.def}>def</h1>
                <h1 className={Style.letra3}>{myPokemon.def}</h1>
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.vel}>speed</h1>
                <h1 className={Style.letra3}>{myPokemon.speed}</h1>
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.height}>height</h1>
                <h1 className={Style.letra3}>{myPokemon.height}</h1>
              </div>
              <div className={Style.letra4}>
                <h1 className={Style.weight}>weight</h1>
                <h1 className={Style.letra3}>{myPokemon.weight}</h1>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

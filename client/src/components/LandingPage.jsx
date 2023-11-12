import React from "react";
import { Link } from "react-router-dom";
import Style from "./LandingPage.module.css";
import background from '../assets/background.jpg'

export default function LandingPage() {
  return (
    <div>
      <img
        className={Style.background}
        src={background}
        alt="Not Found"
      ></img>
      <div className={Style.position}>
        <div className={Style.title}>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 43,
            }}
          >
            Gotta catch 'em all!
          </h1>
        </div>
        <Link to="/home">
          <button className={Style.button}>
            {" "}
            <span>START</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

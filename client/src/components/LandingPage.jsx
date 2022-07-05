import React from "react";
import { Link } from "react-router-dom";
import Style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <img
        className={Style.background}
        src="https://www.clickwallpapers.net/wp-content/uploads/2022/06/clickwallpapers-pokemon-4k-img2-scaled.jpg"
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

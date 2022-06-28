import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
export default function LandingPage() {
  console.log("LANDING");
  return (
    <div className="landing_div">
      <h1>Videogames by Valentino Martinez</h1>
      <Link to="/home">
        <button className="button_landing"> Access </button>
      </Link>
    </div>
  );
}

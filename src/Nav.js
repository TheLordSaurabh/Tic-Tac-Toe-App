import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar">
      <div className="logo">Tic Tac Toe</div>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/source-code">Source Code</Link>
        <Link to="/about">About</Link>
        <Link to="/developer">Developers</Link>
      </ul>
    </div>
  );
}

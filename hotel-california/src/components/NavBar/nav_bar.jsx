import React from "react";
import { Link } from "react-router-dom";
import "./nav_bar_style.css";
import logo from "../../assets/logo.png"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={logo} alt="Hotel California" className="navbar-logo" />
        </Link>
      </div>

      {/* LINKS */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/servicio">Servicios</Link>
        </li>
        <li>
          <Link to="/reservas">Reservas</Link>
        </li>
        <li>
          <Link to="/sobre-nosotros">Nosotros</Link>
        </li>
        <li>
          <Link to="/login" className="login-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

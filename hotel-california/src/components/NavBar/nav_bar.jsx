import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav_bar_style.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../Autenticacion";

export default function Navbar() {
  const { usuario, setUsuario } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuUsuario, setMenuUsuario] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setMenuUsuario(false);
    setMenuAbierto(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMenuUsuario(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={logo} alt="Hotel California" className="navbar-logo" />
        </Link>

        {/* Botón hamburguesa visible solo en mobile */}
        <button
          className={`menu-toggle ${menuAbierto ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menú principal */}
      <ul className={`navbar-links ${menuAbierto ? "open" : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/servicio" onClick={toggleMenu}>Servicios</Link></li>
        <li><Link to="/reservas" onClick={toggleMenu}>Reservas</Link></li>
        <li><Link to="/sobre-nosotros" onClick={toggleMenu}>Nosotros</Link></li>

        {!usuario && (
          <li>
            <Link to="/login" className="login-link" onClick={toggleMenu}>
              Login
            </Link>
          </li>
        )}

        {usuario && (
          <li
            className="usuario-menu"
            onClick={() => setMenuUsuario((prev) => !prev)}
          >
            <p className="usuario-nombre">Hola, {usuario.nombre}</p>

            {menuUsuario && (
              <ul className="dropdown-menu">
                {usuario.rol === "huesped" && (
                  <li><Link to="/mis-reservas" onClick={toggleMenu}>Mis Reservas</Link></li>
                )}
                {usuario.rol === "admin" && (
                  <li><Link to="/dashboard-admin" onClick={toggleMenu}>Dashboard</Link></li>
                )}
                {usuario.rol === "op" && (
                  <li><Link to="/dashboard-operador" onClick={toggleMenu}>Dashboard</Link></li>
                )}
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

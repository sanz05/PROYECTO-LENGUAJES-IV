import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav_bar_style.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../Autenticacion"; // Ajustá la ruta a tu contexto

export default function Navbar() {
  const { usuario, setUsuario } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setMenuAbierto(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={logo} alt="Hotel California" className="navbar-logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/servicio">Servicios</Link></li>
        <li><Link to="/reservas">Reservas</Link></li>
        <li><Link to="/sobre-nosotros">Nosotros</Link></li>

        {!usuario && (
          <li>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </li>
        )}

        {usuario && (
          <li
            className="usuario-menu"
            onClick={() => setMenuAbierto((prev) => !prev)}
            
          >
            <p className="usuario-nombre">Hola, {usuario.nombre}</p>

            {menuAbierto && (
              <ul className="dropdown-menu">
                {usuario.rol === "huesped" && (
                  <li>
                    <Link to="/mis-reservas">Mis Reservas</Link>
                  </li>
                )}
                {usuario && usuario.rol === "admin" && (
                  <li>
                    <Link to="/dashboard-admin">Dashboard</Link>
                  </li>
                )}

                {usuario && usuario.rol === "op" && (
                  <li>
                    <Link to="/dashboard-operador">Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

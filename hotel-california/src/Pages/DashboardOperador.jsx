import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Dashboard.css";

export default function DashboardOperador() {
  return (
    <div className="dashboard-container">
      <h2>Panel del Operador</h2>
      <div className="dashboard-grid">
        <Link to="/mapa-habitaciones" className="card"> Consultar Habitaciones (Mapa)</Link>
        <button
          onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")}
          className="card">
            Abrir Gmail
        </button>

        <Link to="/consultar-reservas" className="card"> Consultar / Liberar Reservas</Link>

      </div>
    </div>
  );
}

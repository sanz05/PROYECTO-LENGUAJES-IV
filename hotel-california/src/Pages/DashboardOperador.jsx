import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Dashboard.css";

export default function DashboardOperador() {
  return (
    <div className="dashboard-container">
      <h2>Panel del Operador</h2>
      <div className="dashboard-grid">
        <Link to="/mapa-habitaciones" className="card"> Consultar Habitaciones (Mapa)</Link>
        <Link to="/mail" className="card"> Responder Mail</Link>
        <Link to="/consultar-reservas" className="card"> Consultar / Liberar Reservas</Link>

      </div>
    </div>
  );
}

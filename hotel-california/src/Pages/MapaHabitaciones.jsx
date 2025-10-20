import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../sv/supabaseClient";
import "../Styles/MapaHabitaciones.css";

export default function MapaHabitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const volverDashboard = () => {
    if (usuario?.rol === "admin") navigate("/dashboard-admin");
    else if (usuario?.rol === "op") navigate("/dashboard-operador");
    else navigate("/");
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  const obtenerHabitaciones = async () => {
    const { data, error } = await supabase.from("habitaciones").select("*");
    if (error) console.error(error);
    else setHabitaciones(data);
  };

  // 🏨 Agrupar habitaciones por tipo
  const habitacionesPorTipo = habitaciones.reduce((acc, hab) => {
    if (!acc[hab.tipo]) acc[hab.tipo] = [];
    acc[hab.tipo].push(hab);
    return acc;
  }, {});

  return (
    <div className="mapa-container">
      <div className="mapa-header">
        <h2>Mapa de Habitaciones</h2>
        <button className="btn-volver" onClick={volverDashboard}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* 🧭 Leyenda */}
      <div className="leyenda">
        <span className="cuadro disponible"></span> Disponible
        <span className="cuadro ocupada"></span> Ocupada
        <span className="cuadro mantenimiento"></span> Mantenimiento
      </div>

      {/* 🏷️ Grupos por tipo */}
      {Object.keys(habitacionesPorTipo).map((tipo) => (
        <div key={tipo} className="grupo-tipo">
          <h3>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>
          <div className="fila-habitaciones">
            {habitacionesPorTipo[tipo].map((hab) => (
              <div
                key={hab.id_habitacion}
                className={`habitacion ${hab.estado}`}
                title={`Habitación ${hab.num_hab} - ${hab.estado}`}
              >
                <p className="num">{hab.num_hab}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

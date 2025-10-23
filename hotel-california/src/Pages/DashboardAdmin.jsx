import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Dashboard.css";
import { supabase } from "../../sv/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardAdmin() {
  const [reservasPorEstado, setReservasPorEstado] = useState([]);
  const [ocupacionPorTipo, setOcupacionPorTipo] = useState([]);
  const [totales, setTotales] = useState({
    huespedes: 0,
    operadores: 0,
    habitaciones: 0,
    reservas: 0,
  });

  useEffect(() => {
    obtenerDatosGraficos();
    obtenerTotales();
  }, []);

  // 📊 Obtener datos para los gráficos
  const obtenerDatosGraficos = async () => {
    // Reservas por estado
    const { data: reservas, error: error1 } = await supabase
      .from("reservas")
      .select("estado");

    if (!error1 && reservas) {
      const conteo = reservas.reduce((acc, r) => {
        acc[r.estado] = (acc[r.estado] || 0) + 1;
        return acc;
      }, {});
      setReservasPorEstado(
        Object.keys(conteo).map((estado) => ({
          estado,
          cantidad: conteo[estado],
        }))
      );
    }

    // Ocupación por tipo
    const { data: habitaciones, error: error2 } = await supabase
      .from("habitaciones")
      .select("tipo, estado");

    if (!error2 && habitaciones) {
      const conteo = habitaciones.reduce((acc, h) => {
        if (!acc[h.tipo]) acc[h.tipo] = { ocupadas: 0, total: 0 };
        acc[h.tipo].total++;
        if (h.estado === "ocupada") acc[h.tipo].ocupadas++;
        return acc;
      }, {});
      setOcupacionPorTipo(
        Object.keys(conteo).map((tipo) => ({
          tipo,
          ocupadas: conteo[tipo].ocupadas,
          disponibles: conteo[tipo].total - conteo[tipo].ocupadas,
        }))
      );
    }
  };

  // 🧾 Obtener totales (usuarios, habitaciones, reservas)
  const obtenerTotales = async () => {
    // Huespedes
    const { count: countHuespedes } = await supabase
      .from("usuarios")
      .select("*", { count: "exact", head: true })
      .eq("rol", "huesped");

    // Operadores
    const { count: countOperadores } = await supabase
      .from("usuarios")
      .select("*", { count: "exact", head: true })
      .eq("rol", "op");

    // Habitaciones
    const { count: countHab } = await supabase
      .from("habitaciones")
      .select("*", { count: "exact", head: true });

    // Reservas
    const { count: countRes } = await supabase
      .from("reservas")
      .select("*", { count: "exact", head: true });

    setTotales({
      huespedes: countHuespedes || 0,
      operadores: countOperadores || 0,
      habitaciones: countHab || 0,
      reservas: countRes || 0,
    });
  };

  const colores = ["#2ecc71", "#f1c40f", "#e74c3c", "#0077fea3"];

  return (
    <div className="dashboard-container">
      <h2>Panel del Administrador</h2>

      {/* OPCIONES PRINCIPALES */}
      <div className="dashboard-grid " id="admin-cards">
        <Link to="/mapa-habitaciones" className="card">
           Consultar Habitaciones (Mapa)
        </Link>

        <Link to="/consultar-reservas" className="card">
           Consultar / Liberar Reservas
        </Link>

        <Link to="/admin/habitaciones" className="card">
           Gestionar Habitaciones
        </Link>

        <Link to="/admin/operadores" className="card">
           Gestionar Operadores
        </Link>
</div>

      {/* SECCIÓN DE TOTALES */}
      <div className="resumen-container">
        <div className="resumen-card">
          👤 <span>{totales.huespedes}</span>
          <p>Huéspedes</p>
        </div>
        <div className="resumen-card">
          🧑‍💼 <span>{totales.operadores}</span>
          <p>Operadores</p>
        </div>
        <div className="resumen-card">
          🏨 <span>{totales.habitaciones}</span>
          <p>Habitaciones</p>
        </div>
        <div className="resumen-card">
          📅 <span>{totales.reservas}</span>
          <p>Reservas Totales</p>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="graficos-container">
        <h3> Estadísticas del Sistema</h3>

        <div className="graficos-grid">
          <div className="grafico">
            <h4>Reservas por Estado</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reservasPorEstado}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="estado" stroke="#d6a950" />
                <YAxis stroke="#d6a950" />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#d6a950" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grafico">
            <h4>Ocupación por Tipo</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ocupacionPorTipo.map((t) => ({
                    name: t.tipo,
                    value: t.ocupadas,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {ocupacionPorTipo.map((_, index) => (
                    <Cell
                      key={index}
                      fill={colores[index % colores.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

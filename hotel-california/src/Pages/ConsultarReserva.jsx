import React, { useEffect, useState } from "react";
import { supabase } from "../../sv/supabaseClient";
import "../Styles/ConsultarReserva.css";
import { useNavigate } from "react-router-dom";

export default function ConsultarReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    const { data, error } = await supabase
      .from("reservas")
      .select(`
        id_reserva,
        fecha_inicio,
        fecha_fin,
        total,
        estado,
        metodo_pago,
        id_habitacion,
        usuarios(nombre, apellido),
        habitaciones(num_hab, tipo)
      `)
      .order("fecha_inicio", { ascending: true });

    if (error) console.error(error);
    else setReservas(data);
  };

  const actualizarEstado = async (id_reserva, nuevoEstado, id_habitacion) => {
    const { error: errorReserva } = await supabase
      .from("reservas")
      .update({ estado: nuevoEstado })
      .eq("id_reserva", id_reserva);

    if (errorReserva) {
      console.error(errorReserva);
      return;
    }

    if (nuevoEstado === "cancelada") {
      await supabase
        .from("habitaciones")
        .update({ estado: "disponible" })
        .eq("id_habitacion", id_habitacion);
    }

    if (nuevoEstado === "confirmada") {
      await supabase
        .from("habitaciones")
        .update({ estado: "ocupada" })
        .eq("id_habitacion", id_habitacion);
    }

    obtenerReservas();
  };

  // ✅ “Eliminar” solo la quita del estado local, sin borrar de Supabase
  const eliminarReservaVisual = (id_reserva) => {
    setReservas((prev) => prev.filter((r) => r.id_reserva !== id_reserva));
  };

  return (
    <div className="reservas-container">
      <div className="reservas-header">
        <h2>Consultar y Liberar Reservas</h2>
        <button
          className="btn-volver"
          onClick={() => navigate("/dashboard-operador")}
        >
          ← Volver al Dashboard
        </button>
      </div>

      <table className="reservas-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Habitación</th>
            <th>Tipo</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id_reserva}>
              <td>{reserva.id_reserva}</td>
              <td>
                {reserva.usuarios
                  ? `${reserva.usuarios.nombre} ${reserva.usuarios.apellido}`
                  : "—"}
              </td>
              <td>{reserva.habitaciones?.num_hab}</td>
              <td>{reserva.habitaciones?.tipo}</td>
              <td>{reserva.fecha_inicio}</td>
              <td>{reserva.fecha_fin}</td>
              <td>${reserva.total}</td>
              <td className={`estado ${reserva.estado.toLowerCase()}`}>
                {reserva.estado}
              </td>
              <td>
                {reserva.estado === "pendiente" && (
                  <>
                    <button
                      className="btn confirmar"
                      onClick={() =>
                        actualizarEstado(
                          reserva.id_reserva,
                          "confirmada",
                          reserva.id_habitacion
                        )
                      }
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="btn liberar"
                      onClick={() =>
                        actualizarEstado(
                          reserva.id_reserva,
                          "cancelada",
                          reserva.id_habitacion
                        )
                      }
                    >
                      ❌ Liberar
                    </button>
                  </>
                )}

                {reserva.estado === "confirmada" && (
                  <button
                    className="btn liberar"
                    onClick={() =>
                      actualizarEstado(
                        reserva.id_reserva,
                        "cancelada",
                        reserva.id_habitacion
                      )
                    }
                  >
                    🗑️ Dar de baja
                  </button>
                )}

                {reserva.estado === "cancelada" && (
                  <button
                    className="btn eliminar"
                    onClick={() => eliminarReservaVisual(reserva.id_reserva)}
                  >
                    🧹 Ocultar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { supabase } from "../../sv/supabaseClient";
import "../Styles/MisReservas.css";
import { useNavigate } from "react-router-dom";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    obtenerMisReservas();
  }, []);

  const obtenerMisReservas = async () => {
    const { data, error } = await supabase
      .from("reservas")
      .select(`
        id_reserva,
        fecha_inicio,
        fecha_fin,
        total,
        estado,
        metodo_pago,
        habitaciones(num_hab, tipo)
      `)
      .eq("id_usuario", usuario.id_usuario)
      .order("fecha_inicio", { ascending: true });

    if (error) console.error(error);
    else setReservas(data);
  };

  const cancelarReserva = async (id_reserva, id_habitacion) => {
    // 1️⃣ Actualiza estado de reserva
    const { error: errorRes } = await supabase
      .from("reservas")
      .update({ estado: "cancelada" })
      .eq("id_reserva", id_reserva);

    // 2️⃣ Libera habitación
    const { error: errorHab } = await supabase
      .from("habitaciones")
      .update({ estado: "disponible" })
      .eq("id_habitacion", id_habitacion);

    if (errorRes || errorHab) console.error(errorRes || errorHab);
    else obtenerMisReservas();
  };

  return (
    <div className="misreservas-container">
      <div className="misreservas-header">
        <h2>Mis Reservas</h2>
        <button
          className="btn-volver"
          onClick={() => navigate("/")}
        >
          ← Volver al Inicio
        </button>
      </div>

      {reservas.length === 0 ? (
        <p className="sin-reservas">No tenés reservas registradas.</p>
      ) : (
        <div className="reservas-grid">
          {reservas.map((r) => (
            <div key={r.id_reserva} className={`reserva-card ${r.estado}`}>
              <div className="reserva-info">
                <h3>Habitación {r.habitaciones?.num_hab}</h3>
                <p><strong>Tipo:</strong> {r.habitaciones?.tipo}</p>
                <p><strong>Desde:</strong> {r.fecha_inicio}</p>
                <p><strong>Hasta:</strong> {r.fecha_fin}</p>
                <p><strong>Total:</strong> ${r.total}</p>
                <p className={`estado ${r.estado}`}>
                  Estado: {r.estado}
                </p>
                <p><strong>Método de pago:</strong> {r.metodo_pago}</p>
              </div>

              {r.estado === "pendiente" && (
                <button
                  className="btn-cancelar"
                  onClick={() =>
                    cancelarReserva(r.id_reserva, r.habitaciones?.id_habitacion)
                  }
                >
                  ❌ Cancelar reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

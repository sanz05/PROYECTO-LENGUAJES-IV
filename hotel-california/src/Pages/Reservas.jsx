import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Reservas.css";
import { habitacionesData } from "../datos/habitacioness";
import DetalleHabitacion from "../components/DetalleHabitacion"; 
import ModalReserva from "../components/ModalReservas/ModalReservas";
import Transicion from "../components/Transiciones";
import { supabase } from "../../sv/supabaseClient";



export default function Reservas() {
  const [habitacionesDB, setHabitacionesDB] = useState([]); // 🧩 desde Supabase
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    nombre: "",
    email: "",
  });
  const [confirmacion, setConfirmacion] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const isLoggedIn = !!usuario;

  // 🧭 Traer habitaciones reales desde Supabase
  useEffect(() => {
  const fetchHabitaciones = async () => {
    try {
      const hoy = new Date().toISOString().split("T")[0];

      // 🔹 1. Traer todas las habitaciones
      const { data: habitaciones, error: errorHab } = await supabase
        .from("habitaciones")
        .select("*");

      if (errorHab) throw errorHab;

      // 🔹 2. Traer reservas confirmadas cuya fecha_fin sea >= hoy
      const { data: reservas, error: errorRes } = await supabase
        .from("reservas")
        .select("id_habitacion, fecha_inicio, fecha_fin, estado")
        .eq("estado", "confirmada")
        .gte("fecha_fin", hoy);

      if (errorRes) throw errorRes;

      // 🔹 3. Filtrar las reservas que están activas hoy
      const habitacionesOcupadasHoy = reservas
        .filter(r => hoy >= r.fecha_inicio && hoy <= r.fecha_fin)
        .map(r => r.id_habitacion);

      // 🔹 4. Actualizar el estado visualmente
      const habitacionesConEstado = habitaciones.map(h => ({
        ...h,
        estado: habitacionesOcupadasHoy.includes(h.id_habitacion)
          ? "ocupada"
          : "disponible",
      }));

      setHabitacionesDB(habitacionesConEstado);
    } catch (error) {
      console.error("Error al traer habitaciones:", error.message);
    }
  };

  fetchHabitaciones();
}, []);


  // Chequear disponibilidad por tipo
  const estaDisponible = (tipo) => {
    const delTipo = habitacionesDB.filter((h) => h.tipo === tipo);
    return delTipo.some((h) => h.estado === "disponible");
  };

  const handleSaberMas = (room) => setSelectedRoom(room);
  const handleCerrarDetalle = () => setSelectedRoom(null);

  const handleReservar = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularNoches = () => {
    const entrada = new Date(formData.fechaEntrada);
    const salida = new Date(formData.fechaSalida);
    const diff = (salida - entrada) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noches = calcularNoches();
    //🧠 Normalizar fechas sin hora y sin desfase horario
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const entrada = new Date(formData.fechaEntrada + "T00:00:00");
    const salida = new Date(formData.fechaSalida + "T00:00:00");

    if (!noches || !formData.fechaEntrada || !formData.fechaSalida) {
      setConfirmacion("⚠️ Completa todos los campos correctamente.");
      return;
    }

    if (!usuario) {
      setConfirmacion("⚠️ Tenés que iniciar sesión para reservar.");
      return;
    }

    // 🚫 Validación de fechas inválidas


    if (entrada < hoy) {
      setConfirmacion("⚠️ La fecha de entrada no puede ser anterior a hoy.");
      return;
    }

    if (salida <= entrada) {
      setConfirmacion("⚠️ La fecha de salida debe ser posterior a la de entrada.");
      return;
    }


    try {
  const total = noches * selectedRoom.precio;

  // 🧭 Obtener todas las habitaciones de ese tipo
  const habitacionesTipo = habitacionesDB.filter(
    (h) => h.tipo === selectedRoom.nombre
  );

  let habitacionLibre = null;

  // 🔍 Revisar cada habitación del tipo
  for (const hab of habitacionesTipo) {
    const { data: reservasExistentes, error: errorRes } = await supabase
      .from("reservas")
      .select("fecha_inicio, fecha_fin")
      .eq("id_habitacion", hab.id_habitacion)
      .neq("estado", "cancelada");

    if (errorRes) throw errorRes;

    const entradaNueva = new Date(formData.fechaEntrada);
    const salidaNueva = new Date(formData.fechaSalida);

    // Verificar si hay superposición
    const haySolapamiento = reservasExistentes.some((r) => {
      const inicio = new Date(r.fecha_inicio);
      const fin = new Date(r.fecha_fin);
      return (
        (entradaNueva >= inicio && entradaNueva < fin) ||
        (salidaNueva > inicio && salidaNueva <= fin) ||
        (entradaNueva <= inicio && salidaNueva >= fin)
      );
    });

    if (!haySolapamiento) {
      habitacionLibre = hab;
      break; // salimos del bucle al encontrar una disponible
    }
  }

  // 🚫 Si no hay ninguna libre, mensaje
  if (!habitacionLibre) {
    setConfirmacion("🚫 No hay habitaciones disponibles de este tipo en esas fechas.");
    return;
  }

  // ✅ Crear la reserva con la habitación libre encontrada
  const { error: reservaError } = await supabase.from("reservas").insert([
    {
      id_usuario: usuario.id_usuario,
      id_habitacion: habitacionLibre.id_habitacion,
      fecha_inicio: formData.fechaEntrada,
      fecha_fin: formData.fechaSalida,
      total: total,
      estado: "pendiente",
      metodo_pago: "efectivo",
    },
  ]);

  if (reservaError) throw reservaError;

  // 🏨 Marcar como ocupada solo si hoy cae dentro del rango
  const hoy = new Date().toISOString().split("T")[0];
  if (hoy >= formData.fechaEntrada && hoy <= formData.fechaSalida) {
    await supabase
      .from("habitaciones")
      .update({ estado: "ocupada" })
      .eq("id_habitacion", habitacionLibre.id_habitacion);
  }

  // 🎉 Mensaje de confirmación
  setConfirmacion(
    `✅ ¡Gracias ${usuario.nombre}! Has reservado una habitación ${selectedRoom.nombre} por ${noches} noche(s). Total: US$${total}.`
  );

  setTimeout(() => {
    setShowModal(false);
    setConfirmacion("");
    window.location.href = "/";
  }, 2500);

} catch (error) {
  console.error(error.message);
  setConfirmacion(`❌ Error: ${error.message}`);
}}

  return (
    <Transicion>
      <div className="reservas-pro">
        <div className="overlay">
          <h2>Nuestras Habitaciones</h2>

          {/* ===== GRID DE CARDS ===== */}
          {!selectedRoom && (
            <div className="cards-pro">
              {habitacionesData.map((hab) => {
                const disponible = estaDisponible(hab.nombre); // check por tipo

                return (
                  <div key={hab.id} className="card-pro">
                    <div className="image-container">
                      <img src={hab.imagenes[0]} alt={hab.nombre} />
                      <div className="servicios-overlay">
                        {hab.servicios.map((s, i) => (
                          <span key={i}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-content">
                      <h3>{hab.nombre}</h3>
                      <p>{hab.descripcion}</p>
                      <p className="precio">US${hab.precio} / noche</p>
                        <button onClick={() => handleSaberMas(hab)}>
                          Saber más
                        </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== DETALLE ===== */}
          {selectedRoom && (
            <DetalleHabitacion
              room={selectedRoom}
              onVolver={handleCerrarDetalle}
              onReservar={handleReservar}
            />
          )}

          {/* ===== MODAL ===== */}
          {showModal && (
            <ModalReserva
              room={selectedRoom}
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancelar={() => setShowModal(false)}
              calcularNoches={calcularNoches}
              confirmacion={confirmacion}
            />
          )}
        </div>
      </div>
    </Transicion>
  );
}
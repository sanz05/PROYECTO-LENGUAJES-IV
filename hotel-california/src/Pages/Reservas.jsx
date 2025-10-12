import React, { useState } from "react";
import { FaWifi, FaCoffee, FaTv, FaUmbrellaBeach } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Reservas.css";
import Simple from "../assets/simple.png";
import Doble from "../assets/Dobles.png";
import Deluxe from "../assets/Deluxe.png";
import Presidencial from "../assets/Presidencial.png";
import Ejecutiva from "../assets/Ejecutiva.png";

export default function Reservas() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    nombre: "",
    email: "",
  });
  const [confirmacion, setConfirmacion] = useState("");

  const isLoggedIn = false; // Simula login

  const habitaciones = [
    {
      id: 1,
      nombre: "Simple",
      descripcion: "Habitación cómoda para una persona, baño privado y TV.",
      detalles:
        "Ideal para viajeros solos, cuenta con una cama individual, baño privado, escritorio y TV LED. Servicio de limpieza diario y desayuno incluido.",
      precio: 80,
      imagenes: [
        Simple,
        Deluxe,
        Ejecutiva,
      ],
      servicios: [<FaWifi />, <FaTv />],
    },
    {
      id: 2,
      nombre: "Doble",
      descripcion: "Espaciosa y luminosa, ideal para dos personas.",
      detalles:
        "Perfecta para parejas o amigos, con dos camas, minibar y TV. Incluye desayuno continental y acceso al gimnasio.",
      precio: 120,
      imagenes: [
        "/images/doble1.jpg",
        "/images/doble2.jpg",
        "/images/doble3.jpg",
      ],
      servicios: [<FaWifi />, <FaCoffee />, <FaTv />],
    },
    {
      id: 3,
      nombre: "Deluxe",
      descripcion: "Incluye balcón, minibar y vista al mar.",
      detalles:
        "Experiencia premium con balcón privado, vista panorámica al mar, minibar, y servicio de habitaciones 24hs.",
      precio: 180,
      imagenes: [
        "/images/deluxe1.jpg",
        "/images/deluxe2.jpg",
        "/images/deluxe3.jpg",
      ],
      servicios: [<FaWifi />, <FaCoffee />, <FaUmbrellaBeach />, <FaTv />],
    },
    {
      id: 4,
      nombre: "Presidencial",
      descripcion: "Incluye balcón, minibar y vista al mar.",
      detalles:
        "Experiencia premium con balcón privado, vista panorámica al mar, minibar, y servicio de habitaciones 24hs.",
      precio: 180,
      imagenes: [
        Presidencial,
        "/images/deluxe2.jpg",
        "/images/deluxe3.jpg",
      ],
      servicios: [<FaWifi />, <FaCoffee />, <FaUmbrellaBeach />, <FaTv />],
    },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const noches = calcularNoches();
    if (!noches || !formData.nombre || !formData.email) {
      setConfirmacion("⚠️ Completa todos los campos correctamente.");
      return;
    }
    const total = noches * selectedRoom.precio;
    setConfirmacion(
      `✅ ¡Gracias ${formData.nombre}! Has reservado la habitación ${selectedRoom.nombre} por ${noches} noche(s). Total: $${total}.`
    );
    setFormData({ fechaEntrada: "", fechaSalida: "", nombre: "", email: "" });
    setShowModal(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="reservas-pro">
      <h2>Nuestras Habitaciones</h2>

      {/* ===== GRID DE CARDS ===== */}
      {!selectedRoom && (
        <div className="cards-pro">
          {habitaciones.map((hab) => (
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
                <p className="precio">${hab.precio} / noche</p>
                <button onClick={() => handleSaberMas(hab)}>Saber más</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== DETALLE HABITACIÓN ===== */}
      {selectedRoom && (
  <div className="detalle-habitacion">
    <button className="volver" onClick={handleCerrarDetalle}>
      ← Volver
    </button>

    <div className="detalle-contenido">
      {/* 🖼 Carrusel IZQUIERDA */}
      <div className="detalle-imagenes">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          adaptiveHeight={true}
          swipeToSlide={true}
        >
          {selectedRoom.imagenes.map((img, i) => (
            <div key={i} className="slide-item">
              <img
                src={img}
                alt={`${selectedRoom.nombre}-${i}`}
                className="detalle-img"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 📝 Info DERECHA */}
      <div className="detalle-info">
        <h3>{selectedRoom.nombre}</h3>
        <p className="detalle-descripcion">{selectedRoom.detalles}</p>
        <div className="detalle-servicios">
          {selectedRoom.servicios.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <p className="detalle-precio">${selectedRoom.precio} / noche</p>
        <button className="reservar-btn" onClick={handleReservar}>
          Reservar ahora
        </button>
      </div>
    </div>
  </div>
)}


      {/* ===== MODAL DE RESERVA ===== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reserva: {selectedRoom.nombre}</h3>
            <form onSubmit={handleSubmit}>
              <label>Nombre completo</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Fecha de entrada</label>
              <input
                type="date"
                name="fechaEntrada"
                value={formData.fechaEntrada}
                onChange={handleChange}
              />
              <label>Fecha de salida</label>
              <input
                type="date"
                name="fechaSalida"
                value={formData.fechaSalida}
                onChange={handleChange}
              />
              <p className="total">
                Total estimado: ${calcularNoches() * selectedRoom.precio}
              </p>
              <div className="btn-group">
                <button type="submit">Confirmar</button>
                <button
                  type="button"
                  className="cancelar"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
            {confirmacion && (
              <p className="mensaje-confirmacion">{confirmacion}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

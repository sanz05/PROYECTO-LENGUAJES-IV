import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Servicio.css";
import restaurante from "../assets/restaurante.png";
import acusticas from "../assets/noche.png";
import bicicletas from "../assets/bicicleta.png";
import yoga from "../assets/yoga.png";
import Transicion from "../components/Transiciones";

export default function Servicio() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const serviciosData = [
    {
      id: "resto",
      img: restaurante,
      title: 'Restaurante "Costa Dorada"',
      desc: "Cocina californiana moderna, fusión de sabores locales y del mar.",
      long:
        "Menú de temporada con mariscos frescos, productos orgánicos de la zona y carta de vinos californianos. Opción vegetariana y sin gluten.",
      highlights: [
        "Terraza con vista al atardecer",
        "Sommelier y maridajes",
        "Música en vivo los viernes",
      ],
    },
    {
      id: "acusticas",
      img: acusticas,
      title: "Noches acústicas bajo el cielo estrellado",
      desc: "Relájate con música en vivo y la brisa de la costa.",
      long:
        "Sesiones íntimas al aire libre con artistas locales. Mantas, fogatas controladas y barra de cócteles de autor.",
      highlights: [
        "Función: Jue–Sáb 20:00",
        "Entrada incluida para huéspedes",
        "Bebidas 2×1 de 20–21 h",
      ],
    },
    {
      id: "bici",
      img: bicicletas,
      title: "Recorridos en bicicleta por la costa",
      desc: "Explorá paisajes naturales y disfrutá la libertad del camino.",
      long:
        "Tours guiados de 8 km y 16 km con paradas fotográficas. Bicis urbanas y eléctricas disponibles, cascos incluidos.",
      highlights: [
        "Salidas: 8:00 y 17:00",
        "Apto para principiantes",
        "Seguro y soporte mecánico",
      ],
    },
    {
      id: "yoga",
      img: yoga,
      title: "Clases de yoga al amanecer",
      desc: "Comenzá tu día con energía y conexión con la naturaleza.",
      long:
        "Vinyasa suave frente al mar, apto para todos los niveles. Se proveen mats, toallas y agua de coco.",
      highlights: [
        "Duración: 45 minutos",
        "Lun–Dom 6:30",
        "Cupo limitado (12)",
      ],
    },
  ];

  const handleOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const irAReservas = () => navigate("/reservas");

  return (
    <Transicion>
      <>
        {/* ===== HERO ===== */}
        <section className="servicios-hero parallax">
          <div className="overlay"></div>
          <div className="servicios-content animate-fade">
            <h1>Servicios Exclusivos</h1>
            <p>Experiencias únicas diseñadas para renovar cuerpo y alma</p>
          </div>
        </section>

        {/* ===== GRID ===== */}
        <section className="servicios animate-up">
          <h2>Vive momentos inolvidables</h2>
          <div className="servicios-grid">
            {serviciosData.map((s) => (
              <div
                key={s.id}
                className="servicio-card servicio-card--clickable"
                onClick={() => handleOpen(s)}
              >
                <img src={s.img} alt={s.title} />
                <div className="servicio-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="cta animate-fade">
          <h2>¿Qué esperas para tu próxima experiencia?</h2>
          <button onClick={irAReservas}>Ver habitaciones</button>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <p>© 2025 Hotel California — Todos los derechos reservados.</p>
        </footer>

        {/* ===== MODAL ===== */}
        {open && selected && (
          <div
            className="modal-overlay"
            onMouseDown={(e) =>
              e.target.classList.contains("modal-overlay") && handleClose()
            }
          >
            <div className="modal-card glass">
              <button className="modal-close" onClick={handleClose}>
                ×
              </button>
              <img className="modal-img" src={selected.img} alt={selected.title} />
              <div className="modal-content">
                <h3>{selected.title}</h3>
                <p>{selected.long}</p>
                <ul>
                  {selected.highlights.map((h, i) => (
                    <li key={i}>• {h}</li>
                  ))}
                </ul>
                <div className="modal-actions">
                  <button className="primary" onClick={irAReservas}>
                    Reservar ahora
                  </button>
                  <button className="secondary" onClick={handleClose}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </Transicion>
  );
}

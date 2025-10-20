import React from "react";
import "../Styles/Servicio.css";
import restaurante from "../assets/restaurante.png";
import acusticas from "../assets/noche.png";
import bicicletas from "../assets/bicicleta.png";
import yoga from "../assets/yoga.png";
import Transicion from "../components/Transiciones";

export default function Servicio() {
  return (
    <Transicion>
    <>
      {/* ===== SECCIÓN PRINCIPAL ===== */}
      <section className="servicios-hero">
        <div className="overlay"></div>
        <div className="servicios-content">
          <h1>Servicios Exclusivos</h1>
          <p>Experiencias únicas diseñadas para renovar cuerpo y alma</p>
        </div>
      </section>

      {/* ===== LISTA DE SERVICIOS ===== */}
      <section className="servicios">
        <h2>Vive momentos inolvidables</h2>
        <div className="servicios-grid">
          <div className="servicio-card">
            <img src={restaurante} alt="Restaurante Golden Coast" />
            <h3>🍷 Restaurante “Golden Coast”</h3>
            <p>Cocina californiana moderna, fusión de sabores locales y del mar.</p>
          </div>

          <div className="servicio-card">
            <img src={acusticas} alt="Noches Acústicas" />
            <h3>🎶 Noches acústicas bajo el cielo estrellado</h3>
            <p>Relajate con música en vivo y la brisa de la costa.</p>
          </div>

          <div className="servicio-card">
            <img src={bicicletas} alt="Recorridos en Bicicleta" />
            <h3>🚲 Recorridos en bicicleta por la costa</h3>
            <p>Explorá paisajes naturales y disfrutá la libertad del camino.</p>
          </div>

          <div className="servicio-card">
            <img src={yoga} alt="Clases de Yoga" />
            <h3>🌴 Clases de yoga al amanecer</h3>
            <p>Comenzá tu día con energía y conexión con la naturaleza.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>¿Que esperas para registrarte?</h2>
        <button>Registrarme</button>
      </section>      {/* ===== CTA ===== */}


      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2025 Hotel California. Todos los derechos reservados.</p>
        <p>Santa Cruz, California — Estados Unidos</p>
      </footer>
    </>
    </Transicion>
  );
}

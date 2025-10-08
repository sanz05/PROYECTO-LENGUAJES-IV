import React from "react";
import "../Styles/Home.css";
import hotelBg from "../assets/hotelbg.png";
import habit1 from "../assets/deluxe.png";
import habit2 from "../assets/ejecutiva.png";
import habit3 from "../assets/presidencial.png";
import Clima from "../components/Clima/Clima";

export default function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${hotelBg})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Bienvenido al Hotel California</h1>
          <p>Donde el lujo, el confort y la calidez se encuentran.</p>


          <button>Reservar ahora</button>
        </div>
      </section>

      {/* ===== SECCIÓN BIENVENIDA ===== */}
      <section className="bienvenida">
        <h2>Una experiencia que va más allá de la estancia</h2>
        <p>
          En <strong>Hotel California</strong> combinamos elegancia, hospitalidad y confort.  
          Más allá de la estancia, te espera la magia del clima de Santa Cruz, que acompaña  
          tus días y noches con la misma calidez que nuestro servicio.
        </p>
        <Clima />
      </section>

      {/* ===== SECCIÓN HABITACIONES ===== */}
      <section className="habitaciones">
        <h2>Nuestras Habitaciones</h2>
        <div className="cards">
          <div className="card">
            <img src={habit1} alt="Suite Deluxe" />
            <h3>Suite Deluxe</h3>
            <p>Amplia, luminosa y con vistas al jardín.</p>
          </div>
          <div className="card">
            <img src={habit2} alt="Suite Ejecutiva" />
            <h3>Suite Ejecutiva</h3>
            <p>Diseñada para el confort y el descanso absoluto.</p>
          </div>
          <div className="card">
            <img src={habit3} alt="Suite Presidencial" />
            <h3>Suite Presidencial</h3>
            <p>Lujo sin límites, con terraza privada y jacuzzi.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta">
        <h2>¿Listo para tu próxima escapada?</h2>
        <button>Reservar ahora</button>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2025 Hotel California. Todos los derechos reservados.</p>
        <p>Santa Cruz, California — Estados Unidos</p>
      </footer>
    </>
  );
}

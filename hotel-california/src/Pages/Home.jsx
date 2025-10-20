import React from "react";
import "../Styles/Home.css";
import hotelBg from "../assets/hotelbg.png";
import Clima from "../components/Clima/Clima";
import CircularGallery from "../components/Galeria/CircularGallery";
import Transicion from "../components/Transiciones";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Transicion>
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

        <Link to="/reservas">
          <button >Reservar ahora</button>
        </Link>
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
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
        <p className="clima-titulo">Donde el clima acompaña tus momentos, nuestros huespedes disfrutan actualmente: </p>
        <Clima />

      </section>


      {/* ===== CTA ===== */}
      <section className="cta">
        <h2>¿Listo para tu próxima escapada?</h2>
        <Link to="/reservas">
          <button >Reservar ahora</button>
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2025 Hotel California. Todos los derechos reservados.</p>
        <p>Santa Cruz, California — Estados Unidos</p>
      </footer>
    </>
    </Transicion>
  );
}

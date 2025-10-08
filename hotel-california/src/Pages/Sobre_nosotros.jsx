import React from "react";
import "../Styles/Sobre_nosotros.css";
import lobbyImg from "../assets/lobby.png";
import sunsetImg from "../assets/sunset.png";

export default function Sobre_nosotros() {
  return (
    <div className="sobre-container">
      <div className="sobre-content">
        <div className="texto">
          <h2>Sobre Nosotros</h2>
          <p>
            Bienvenidos a <strong>Hotel California</strong>, un refugio de serenidad y estilo en la vibrante 
            costa de California. Nuestro hotel celebra la esencia del estilo de vida californiano: libertad, sofisticación y 
            conexión con la naturaleza.
          </p>
          <p>
            Cada espacio ha sido cuidadosamente diseñado para ofrecer confort y elegancia: desde nuestras habitaciones con 
            vistas al océano hasta los atardeceres en la terraza con vino en mano, cada detalle está pensado para que te relajes, 
            te inspires y vivas la auténtica experiencia californiana.
          </p>
          <button
            onClick={() =>
              window.open(
                "https://maps.app.goo.gl/AEZkKfuibVQX5Urm7",
                "_blank"
              )
            }
          >
            Ubicación
          </button>
        </div>

        <div className="imagen">
          <img src={lobbyImg} alt="Lobby del Hotel California" />
        </div>
      </div>

      {/* Sección adicional */}
      <div className="extra-section">
        <div className="extra-text">
          <h3>Vive la Experiencia California</h3>
          <p>
            En <strong>Hotel California</strong>, no solo te hospedás: vivís una 
            experiencia que mezcla el espíritu surfero, el arte bohemio y la calma
            del desierto. Nuestra filosofía es simple: desconectar del ruido y 
            reconectar con vos mismo.
          </p>
          <ul>
            <li>🌅 Spa con tratamientos naturales frente al mar</li>
            <li>🍷 Restaurante “Golden Coast” con cocina californiana moderna</li>
            <li>🎶 Noches acústicas bajo el cielo estrellado</li>
            <li>🚲 Recorridos en bicicleta por la costa</li>
            <li>🌴 Clases de yoga al amanecer</li>
          </ul>
        </div>

        <div className="extra-img">
          <img src={sunsetImg} alt="Atardecer en Hotel California" />
        </div>
      </div>

      {/* ==== SECCIÓN DE CONTACTO ==== */}
      <div className="contact-section">
        <h3>Contacto</h3>
        <p>📞 Teléfono: <a href="tel:+543875821274">3875821274</a></p>
        <p>📧 Email: <a href="mailto:mailHotelcalifornia@gmail.com">mailHotelcalifornia@gmail.com</a></p>
        <p>📍 Ubicación: California, Panther Beach</p>
        <p>🕓 Atención: Lunes a Domingo, 8:00 a 22:00 hs</p>

        <div className="social-links">
          <a href="https://www.instagram.com/hotelcaliforniasj/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span>·</span>
          <a href="https://www.facebook.com/EaglesTributeHotelCalifornia" target="_blank" rel="noopener noreferrer">Facebook</a>
          <span>·</span>
          <a href="https://wa.me/543875821274" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>

      {/* ==== FOOTER ==== */}
      <footer className="footerss">
        <p>© 2025 Hotel California. Todos los derechos reservados.</p>
        <p>Santa Cruz, California — Estados Unidos</p>
      </footer>
    </div>
  );
}

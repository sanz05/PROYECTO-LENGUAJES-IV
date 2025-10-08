import React from "react";
import "../Styles/Sobre_nosotros.css";
import lobbyImg from "../assets/lobby.png"; 

export default function Sobre_nosotros() {
  return (
    <div className="sobre-container">
      <div className="sobre-content">
        <div className="texto">
          <h2>Sobre Nosotros</h2>
          <p>
            En <strong>Hotel California</strong> creemos que la elegancia se
            encuentra en los detalles. Nuestro objetivo es brindar una
            experiencia única, donde el confort, el servicio y la calidez se
            combinan para crear momentos inolvidables.
          </p>
          <p>
            Desde nuestras suites con vista al atardecer hasta nuestro
            restaurante gourmet, cada espacio está diseñado para que te sientas
            como en casa, pero mejor.
          </p>
          <button>Conocé más</button>
        </div>

        <div className="imagen">
          <img src={lobbyImg} alt="Lobby del Hotel California" />
        </div>
      </div>
    </div>
  );
}

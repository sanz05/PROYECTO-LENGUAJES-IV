import React, { useState } from "react";
import "../Styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // más adelante podés integrar Firebase o una API acá
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <h2>Acceso al Hotel</h2>
        <p className="login-subtext">
          Iniciá sesión para gestionar tus reservas o acceder a beneficios exclusivos.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>

        <p className="login-footer">
          ¿No tenés cuenta? <a href="#">Registrate aquí</a>
        </p>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import "../Styles/Login.css";
import Transicion from "../components/Transiciones";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../sv/supabaseClient";
import { useAuth } from "../components/Autenticacion"; // 👈 importás el hook


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setUsuario } = useAuth(); // 👈 obtenés el setter global
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Buscar el usuario por email
      const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !usuario) {
        setMensaje("❌ Usuario no encontrado.");
        return;
      }

      // Verificar contraseña
      if (usuario.contraseña !== password) {
        setMensaje("⚠️ Contraseña incorrecta.");
        return;
      }

      // ✅ Login exitoso
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setUsuario(usuario);
      setMensaje(`✅ Bienvenido/a ${usuario.nombre} ${usuario.apellido}`);

      // 🔁 Redirigir al Home ("/") después de 1 segundo
      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      console.error("Error en login:", error);
      setMensaje(`⚠️ Error inesperado: ${error.message}`);
    }
  };

  return (
    <Transicion>
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

          {mensaje && <p className="mensaje-login">{mensaje}</p>}

          <p className="login-footer">
            ¿No tenés cuenta? <Link to="/register">Registrate aquí</Link>
          </p>
        </div>
      </section>
    </Transicion>
  );
}

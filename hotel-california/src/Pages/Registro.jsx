import React, { useState } from "react";
import "../styles/Registro.css";
import { supabase } from "../../sv/supabaseClient";
import Transicion from "../components/Transiciones"

export default function Registro() {

    const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
});

const [mensaje, setMensaje] = useState("");

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setMensaje("❌ Las contraseñas no coinciden.");
    return;
  }

  try {
    // Verificar si el email ya existe
    const { data: existente } = await supabase
      .from("usuarios")
      .select("email")
      .eq("email", formData.email);

    if (existente && existente.length > 0) {
      setMensaje("⚠️ Este correo ya está registrado.");
      return;
    }

    // Insertar nuevo usuario
    const { data, error } = await supabase.from("usuarios").insert([
      {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        contraseña: formData.password, // 🔥 sin hash
        telefono: formData.telefono,
        rol: "huesped",
      },
    ]);

    if (error) throw error;

    setMensaje("✅ Usuario registrado con éxito.");
    console.log("Usuario insertado:", data);
  } catch (error) {
    console.error(error.message);
    setMensaje(`⚠️ Error: ${error.message}`);
  }
};


return (
  <Transicion>
    <section className="registro-container">
        <div className="registro-box">
        <h2>Crear una cuenta</h2>
        <p className="registro-subtext">
            Unite a Hotel California y accedé a beneficios exclusivos.
        </p>

        <form onSubmit={handleSubmit} className="registro-form">
            <div className="registro-grid">
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="+54 9 11 5555-5555"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <div className="registro-grid">
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {mensaje && <p className="registro-mensaje">{mensaje}</p>}

          <button type="submit" className="btn-registrar">
            Registrarme
          </button>
        </form>

        <p className="registro-footer">
          ¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a>
        </p>
      </div>
    </section>
    </Transicion>
  );
}

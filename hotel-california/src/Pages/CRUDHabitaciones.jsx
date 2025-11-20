import React, { useEffect, useState } from "react";
import { supabase } from "../../sv/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../Styles/CRUDs.css";

export default function CRUDHabitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const volverDashboard = () => {
    if (usuario?.rol === "admin") navigate("/dashboard-admin");
    else if (usuario?.rol === "op") navigate("/dashboard-operador");
    else navigate("/");
  };

  const [nuevaHab, setNuevaHab] = useState({
    num_hab: "",
    tipo: "",
    precio_noche: "",
    estado: "disponible",
    descripcion: "",
  });

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  const obtenerHabitaciones = async () => {
    const { data, error } = await supabase.from("habitaciones").select("*");
    if (error) console.error(error);
    else setHabitaciones(data);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tipo") {
      let precio = "";
      let descripcion = "";

      if (value === "Simple") {
        precio = 80;
        descripcion = "Habitación simple con cama individual";
      } else if (value === "Doble") {
        precio = 120;
        descripcion = "Habitación doble con dos camas individuales";
      } else if (value === "Deluxe") {
        precio = 180;
        descripcion = "Habitación deluxe con vista al mar";
      } else if (value === "Presidencial") {
        precio = 300;
        descripcion = "Suite presidencial con jacuzzi y balcón privado";
      }

      setNuevaHab({
        ...nuevaHab,
        tipo: value,
        precio_noche: precio,
        descripcion: descripcion,
      });
    } else {
      setNuevaHab({ ...nuevaHab, [name]: value });
    }
  };

  // ➕ Crear nueva habitación
  const agregarHabitacion = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("habitaciones").insert([nuevaHab]);
    if (error) console.error(error);
    else {
      setNuevaHab({
        num_hab: "",
        tipo: "",
        precio_noche: "",
        estado: "disponible",
        descripcion: "",
      });
      setMostrarFormulario(false);
      obtenerHabitaciones();
    }
  };

  // ✏️ Guardar edición
  const guardarEdicion = async (hab) => {
    const { error } = await supabase
      .from("habitaciones")
      .update(hab)
      .eq("id_habitacion", hab.id_habitacion);
    if (error) console.error(error);
    else {
      setEditando(null);
      obtenerHabitaciones();
    }
  };

  // 🛠️ Cambiar estado mantenimiento
  const toggleMantenimiento = async (hab) => {
    const nuevoEstado =
      hab.estado === "mantenimiento" ? "disponible" : "mantenimiento";
    const { error } = await supabase
      .from("habitaciones")
      .update({ estado: nuevoEstado })
      .eq("id_habitacion", hab.id_habitacion);
    if (error) console.error(error);
    else obtenerHabitaciones();
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Gestión de Habitaciones</h2>
        <div className="header-buttons">
          <button className="btn-volver" onClick={volverDashboard}>
          ← Volver al Dashboard
        </button>
          <button
            className="btn-agregar"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "✖ Cerrar" : "➕ Agregar habitación"}
          </button>
        </div>
      </div>

      {/* FORMULARIO NUEVA HABITACIÓN */}
      {mostrarFormulario && (
        <form className="form-nueva" onSubmit={agregarHabitacion}>
          <h3>Nueva habitación</h3>

          <input
            type="number"
            name="num_hab"
            placeholder="Número"
            value={nuevaHab.num_hab}
            onChange={handleChange}
            required
          />

          <select
            name="tipo"
            value={nuevaHab.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Simple">Simple</option>
            <option value="Doble">Doble</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Presidencial">Presidencial</option>
          </select>

          <input
            type="number"
            name="precio_noche"
            value={nuevaHab.precio_noche}
            readOnly
          />
          <textarea
            name="descripcion"
            value={nuevaHab.descripcion}
            readOnly
          ></textarea>

          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      )}

      {/* TABLA DE HABITACIONES */}
      <table className="crud-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((hab) =>
            editando === hab.id_habitacion ? (
              <tr key={hab.id_habitacion}>
                <td>{hab.id_habitacion}</td>
                <td>
                  <input
                    value={hab.num_hab}
                    onChange={(e) =>
                      setHabitaciones((prev) =>
                        prev.map((h) =>
                          h.id_habitacion === hab.id_habitacion
                            ? { ...h, num_hab: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </td>
                <td>{hab.tipo}</td>
                <td>
                  <input
                    type="number"
                    value={hab.precio_noche}
                    onChange={(e) =>
                      setHabitaciones((prev) =>
                        prev.map((h) =>
                          h.id_habitacion === hab.id_habitacion
                            ? { ...h, precio_noche: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </td>
                <td>{hab.estado}</td>
                <td>
                  <textarea
                    value={hab.descripcion}
                    onChange={(e) =>
                      setHabitaciones((prev) =>
                        prev.map((h) =>
                          h.id_habitacion === hab.id_habitacion
                            ? { ...h, descripcion: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <button onClick={() => guardarEdicion(hab)}>💾 Guardar</button>
                  <button onClick={() => setEditando(null)}>❌ Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={hab.id_habitacion}>
                <td>{hab.id_habitacion}</td>
                <td>{hab.num_hab}</td>
                <td>{hab.tipo}</td>
                <td>${hab.precio_noche}</td>
                <td className={`estado-${hab.estado}`}>{hab.estado}</td>
                <td>{hab.descripcion}</td>
                <td className="acciones">
                  <button onClick={() => setEditando(hab.id_habitacion)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => toggleMantenimiento(hab)}>
                    {hab.estado === "mantenimiento"
                      ? "🔓 Activar"
                      : "🔧 Mantenimiento"}
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { supabase } from "../../sv/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../Styles/CRUDs.css"; // usamos el mismo estilo dorado

export default function CRUDOperadores() {
  const [operadores, setOperadores] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const [nuevoOperador, setNuevoOperador] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: "op", // rol fijo
  });

  useEffect(() => {
    obtenerOperadores();
  }, []);

  // 🔹 Obtener todos los operadores
  const obtenerOperadores = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("rol", "op");

    if (error) console.error(error);
    else setOperadores(data);
  };

  const handleChange = (e) => {
    setNuevoOperador({ ...nuevoOperador, [e.target.name]: e.target.value });
  };

  // ➕ Agregar operador
  const agregarOperador = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("usuarios").insert([nuevoOperador]);
    if (error) {
      console.error(error);
      alert("Error al crear operador");
    } else {
      setNuevoOperador({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        rol: "op",
      });
      setMostrarFormulario(false);
      obtenerOperadores();
    }
  };

  // ✏️ Guardar cambios
  const guardarEdicion = async (op) => {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombre: op.nombre,
        apellido: op.apellido,
        telefono: op.telefono,
        email: op.email,
      })
      .eq("id", op.id);

    if (error) console.error(error);
    else {
      setEditando(null);
      obtenerOperadores();
    }
  };

  // 🗑️ Eliminar operador
  const eliminarOperador = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este operador?")) return;

    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) console.error(error);
    else obtenerOperadores();
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Gestión de Operadores</h2>
        <div className="header-buttons">
          <button
            className="btn-volver"
            onClick={() => navigate("/dashboard-admin")}
          >
            ← Volver al Dashboard
          </button>
          <button
            className="btn-agregar"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "✖ Cerrar" : "➕ Agregar operador"}
          </button>
        </div>
      </div>

      {/* FORMULARIO NUEVO OPERADOR */}
      {mostrarFormulario && (
        <form className="form-nueva" onSubmit={agregarOperador}>
          <h3>Nuevo operador</h3>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoOperador.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={nuevoOperador.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={nuevoOperador.telefono}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={nuevoOperador.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-guardar">
            Crear operador
          </button>
        </form>
      )}

      {/* TABLA DE OPERADORES */}
      <table className="crud-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {operadores.map((op) =>
            editando === op.id ? (
              <tr key={op.id}>
                <td>
                  <input
                    value={op.nombre}
                    onChange={(e) =>
                      setOperadores((prev) =>
                        prev.map((o) =>
                          o.id === op.id ? { ...o, nombre: e.target.value } : o
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    value={op.apellido}
                    onChange={(e) =>
                      setOperadores((prev) =>
                        prev.map((o) =>
                          o.id === op.id
                            ? { ...o, apellido: e.target.value }
                            : o
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    value={op.telefono}
                    onChange={(e) =>
                      setOperadores((prev) =>
                        prev.map((o) =>
                          o.id === op.id
                            ? { ...o, telefono: e.target.value }
                            : o
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    value={op.email}
                    onChange={(e) =>
                      setOperadores((prev) =>
                        prev.map((o) =>
                          o.id === op.id ? { ...o, email: e.target.value } : o
                        )
                      )
                    }
                  />
                </td>
                <td>{op.rol}</td>
                <td>
                  <button onClick={() => guardarEdicion(op)}>💾 Guardar</button>
                  <button onClick={() => setEditando(null)}>❌ Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={op.id}>
                <td>{op.nombre}</td>
                <td>{op.apellido}</td>
                <td>{op.telefono}</td>
                <td>{op.email}</td>
                <td>Operador</td>
                <td className="acciones">
                  <button onClick={() => setEditando(op.id)}>✏️ Editar</button>
                  <button onClick={() => eliminarOperador(op.id)}>
                    🗑️ Eliminar
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

import React, { useEffect, useState } from "react";
import { supabase } from "../../sv/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../Styles/CRUDs.css";

export default function CRUDOperadores() {
  const [operadores, setOperadores] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalPass, setMostrarModalPass] = useState(false);
  const [nuevaPass, setNuevaPass] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState(null);

  const navigate = useNavigate();

  const volverDashboard = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.rol === "admin") navigate("/dashboard-admin");
    else if (usuario?.rol === "op") navigate("/dashboard-operador");
    else navigate("/");
  };

  const [nuevoOperador, setNuevoOperador] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    contraseña: "",
    rol: "op",
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

    const { data, error } = await supabase
      .from("usuarios")
      .insert([nuevoOperador])
      .select();

    if (error) {
      console.error("Error al crear operador:", error);
      alert("⚠️ Error al crear operador: " + error.message);
    } else {
      console.log("✅ Operador creado:", data);
      setNuevoOperador({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        contraseña: "",
        rol: "op",
      });
      setMostrarFormulario(false);
      await obtenerOperadores();
    }
  };

  // ✏️ Guardar cambios (nombre, email, etc.)
  const guardarEdicion = async (op) => {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombre: op.nombre,
        apellido: op.apellido,
        telefono: op.telefono,
        email: op.email,
      })
      .eq("id_usuario", op.id_usuario);

    if (error) console.error(error);
    else {
      setEditando(null);
      obtenerOperadores();
    }
  };

  // 🗑️ Eliminar operador
  const eliminarOperador = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este operador?")) return;
    const { error } = await supabase.from("usuarios").delete().eq("id_usuario", id);
    if (error) console.error(error);
    else obtenerOperadores();
  };

  // 🔑 Abrir modal de cambio de contraseña
  const abrirModalPass = (op) => {
    setOperadorSeleccionado(op);
    setNuevaPass("");
    setMostrarModalPass(true);
  };

  // 💾 Guardar nueva contraseña
  const guardarNuevaPass = async () => {
    if (!nuevaPass.trim()) {
      alert("⚠️ Ingresá una nueva contraseña.");
      return;
    }

    const { error } = await supabase
      .from("usuarios")
      .update({ contraseña: nuevaPass })
      .eq("id_usuario", operadorSeleccionado.id_usuario);

    if (error) {
      console.error(error);
      alert("Error al actualizar contraseña.");
    } else {
      alert("✅ Contraseña actualizada correctamente.");
      setMostrarModalPass(false);
      setOperadorSeleccionado(null);
      await obtenerOperadores();
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Gestión de Operadores</h2>
        <div className="header-buttons">
          <button className="btn-volver" onClick={volverDashboard}>
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
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={nuevoOperador.contraseña}
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
            <th className="accioness">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {operadores.map((op) =>
            editando === op.id_usuario ? (
              <tr key={op.id_usuario}>
                <td>
                  <input
                    value={op.nombre}
                    onChange={(e) =>
                      setOperadores((prev) =>
                        prev.map((o) =>
                          o.id_usuario === op.id_usuario
                            ? { ...o, nombre: e.target.value }
                            : o
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
                          o.id_usuario === op.id_usuario
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
                          o.id_usuario === op.id_usuario
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
                          o.id_usuario === op.id_usuario
                            ? { ...o, email: e.target.value }
                            : o
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
              <tr key={op.id_usuario}>
                <td>{op.nombre}</td>
                <td>{op.apellido}</td>
                <td>{op.telefono}</td>
                <td>{op.email}</td>
                <td>{op.rol}</td>
                <td className="acciones">
                  <button onClick={() => setEditando(op.id_usuario)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => abrirModalPass(op)}>🔑 Cambiar contraseña</button>
                  <button onClick={() => eliminarOperador(op.id_usuario)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* MODAL CAMBIO DE CONTRASEÑA */}
      {mostrarModalPass && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Cambiar contraseña</h3>
      <p>
        Operador:{" "}
        <strong>
          {operadorSeleccionado?.nombre} {operadorSeleccionado?.apellido}
        </strong>
      </p>

      <p style={{ marginTop: "10px", color: "#f1d28a" }}>
        Contraseña actual:
        <span
          style={{
            marginLeft: "8px",
            color: "#fff",
            backgroundColor: "#2e1d1d",
            padding: "4px 8px",
            borderRadius: "6px",
            fontFamily: "monospace",
          }}
        >
          {operadorSeleccionado?.contraseña || "No disponible"}
        </span>
      </p>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPass}
        onChange={(e) => setNuevaPass(e.target.value)}
      />
      <div className="modal-buttons">
        <button className="btn-guardar" onClick={guardarNuevaPass}>
          💾 Guardar
        </button>
        <button
          className="btn-cancelar"
          onClick={() => setMostrarModalPass(false)}
        >
          ❌ Cancelar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

import React from "react";
import "../../styles/Reservas.css";
import "./ModalReservas.css" // opcional, solo si usás clases que ya están ahí

export default function ModalReserva({
  room,
  formData,
  onChange,
  onSubmit,
  onCancelar,
  calcularNoches,
  confirmacion,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Reserva: {room.nombre}</h3>

        <form onSubmit={onSubmit}>
          <label>Nombre completo</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />

          <label>Fecha de entrada</label>
          <input
            type="date"
            name="fechaEntrada"
            value={formData.fechaEntrada}
            onChange={onChange}
            required
            min={new Date().toISOString().split("T")[0]} // evita fechas pasadas
          />

          <label>Fecha de salida</label>
          <input
            type="date"
            name="fechaSalida"
            value={formData.fechaSalida}
            onChange={onChange}
            required
            min={formData.fechaEntrada || new Date().toISOString().split("T")[0]} // evita salir antes de entrar
          />


          <div className="total-estimado">
            <span>Total estimado:</span> 
            <strong>${calcularNoches() * room.precio}</strong>
          </div>

          <div className="btn-group">
            <button type="submit">Confirmar</button>
            <button
              type="button"
              className="cancelar"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          </div>
        </form>

        {confirmacion && (
          <p className="mensaje-confirmacion">{confirmacion}</p>
        )}
      </div>
    </div>
  );
}

import { Navigate } from "react-router-dom";

export default function RutaProtegida({ children, rolRequerido }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si rolRequerido es un string (por compatibilidad) o un array
  const rolesPermitidos = Array.isArray(rolRequerido)
    ? rolRequerido
    : [rolRequerido];

  // Verificamos si el rol del usuario está dentro de los permitidos
  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}
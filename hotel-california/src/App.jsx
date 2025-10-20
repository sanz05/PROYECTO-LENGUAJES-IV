import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/nav_bar";
import Home from "./Pages/Home";
import Servicio from "./Pages/Servicio";
import Reservas from "./Pages/Reservas";
import SobreNosotros from "./Pages/Sobre_nosotros";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import { AuthProvider } from "./components/Autenticacion";
import DashboardAdmin from "./Pages/DashboardAdmin";
import DashboardOperador from "./Pages/DashboardOperador";
import RutaProtegida from "./components/RutaProtegida"; 
import MapaHabitaciones from "./Pages/MapaHabitaciones";
import ConsultarReservas from "./Pages/ConsultarReserva";
import MisReservas from "./Pages/MisReservas";
import CRUDHabitaciones from "./Pages/CRUDHabitaciones";
import CRUDOperadores from "./Pages/CRUDOperadores";






export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicio" element={<Servicio />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
            path="/dashboard-admin"
            element={
            <RutaProtegida rolRequerido="admin">
            <DashboardAdmin />
            </RutaProtegida>
            }
        />

        <Route
            path="/dashboard-operador"
            element={
            <RutaProtegida rolRequerido="op">
            <DashboardOperador />
            </RutaProtegida>
            }
        />

        <Route
            path="/mapa-habitaciones"
            element={
            <RutaProtegida rolRequerido={["op", "admin"]}>
            <MapaHabitaciones />
            </RutaProtegida>
            }
        />

        <Route
            path="/consultar-reservas"
            element={
            <RutaProtegida rolRequerido={["op", "admin"]}>
            <ConsultarReservas />
            </RutaProtegida>
            }
        />

        <Route
            path="/mis-reservas"
            element={
            <RutaProtegida rolRequerido="huesped">
            <MisReservas />
            </RutaProtegida>
            }
        />

        <Route
          path="/admin/habitaciones"
          element={
            <RutaProtegida rolRequerido="admin">
              <CRUDHabitaciones />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/operadores"
          element={
            <RutaProtegida rolRequerido="admin">
              <CRUDOperadores />
            </RutaProtegida>
          }
        />
    </Routes>
    </AuthProvider>
  );
}

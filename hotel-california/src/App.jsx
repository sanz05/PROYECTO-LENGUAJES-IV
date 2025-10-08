import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/nav_bar";
import Home from "./Pages/Home";
import Servicio from "./Pages/Servicio";
import Reservas from "./Pages/Reservas";
import SobreNosotros from "./Pages/Sobre_nosotros";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicio />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </>
  );
}

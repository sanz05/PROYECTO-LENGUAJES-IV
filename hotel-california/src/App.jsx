import { Routes, Route, Link } from "react-router-dom";
import Sobre_nosotros from "./Pages/Sobre_nosotros";
import Servicio from "./Pages/Servicio";
import Home from "./Pages/Home";

export default function App() {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/Sobre_nosotros">Sobre Nosotros</Link>
        <Link to="/Servicio">Servicios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Servicio" element={<Servicio />} />
        <Route path="/Sobre_nosotros" element={<Sobre_nosotros />} />
      </Routes>
    </>
  );
}

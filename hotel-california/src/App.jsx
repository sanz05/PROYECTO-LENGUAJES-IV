import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contacto from "./Pages/contacto";
import Servicios from "./Pages/servicios";
import Home from "./Pages/home";

export default function App() {
  return (
<<<<<<< Updated upstream
    <>
      <h1></h1>
      <h1>HOLIS</h1>
      <h2>Hotel California</h2>
      <h3>Misterioso lugar</h3>
    </>
  )
}

export default App;
=======
    <Router>
      {/* Menú de navegación */}
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/contacto">Contactosssss</Link>
        <Link to="/servicios">Servicios</Link>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}
>>>>>>> Stashed changes

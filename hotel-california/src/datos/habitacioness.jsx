// src/data/habitaciones.js
import { FaWifi, FaCoffee, FaTv, FaUmbrellaBeach } from "react-icons/fa";
import Simple from "../assets/simple.png";
import Doble from "../assets/Dobles.png";
import Deluxe from "../assets/Deluxe.png";
import Presidencial from "../assets/Presidencial.png";
import BañoSimple from "../assets/simple-baño.png";
import MiniDoble from "../assets/minibarDOBLES.png";
import BañoDobles from "../assets/bañoDOBLES.png";
import DeluxeBaño from "../assets/DeluxeBaño.png";
import DeluxeBalcon from "../assets/BalconDeluxe.png";
import PresidencialCama from "../assets/PresidencialCama.png";
import BañoPresidencial from "../assets/BañoPresidencial.png";

export const habitacionesData = [
    {
    id: 1,
    nombre: "Simple",
    descripcion: "Habitación cómoda para una persona, baño privado y TV.",
    detalles: "Ideal para viajeros solos, cama individual, escritorio y TV LED.",
    precio: 80,
    imagenes: [Simple, BañoSimple],
    servicios: [<FaWifi />, <FaTv />],
    },
    {
    id: 2,
    nombre: "Doble",
    descripcion: "Espaciosa y luminosa, ideal para dos personas.",
    detalles: "Dos camas, minibar y TV. Incluye desayuno continental.",
    precio: 120,
    imagenes: [Doble, MiniDoble, BañoDobles],
    servicios: [<FaWifi />, <FaCoffee />, <FaTv />],
    },
    {
    id: 3,
    nombre: "Deluxe",
    descripcion: "Incluye balcón, minibar y vista al mar.",
    detalles: "Experiencia premium con balcón privado y vista panorámica.",
    precio: 180,
    imagenes: [Deluxe, DeluxeBalcon, DeluxeBaño],
    servicios: [<FaWifi />, <FaCoffee />, <FaUmbrellaBeach />, <FaTv />],
    },
    {
    id: 4,
    nombre: "Presidencial",
    descripcion: "La más lujosa del hotel, vista 360° y servicio VIP.",
    detalles: "Salón privado, minibar premium, balcón y servicio personalizado.",
    precio: 250,
    imagenes: [Presidencial, PresidencialCama, BañoPresidencial],
    servicios: [<FaWifi />, <FaCoffee />, <FaUmbrellaBeach />, <FaTv />],
    },
];

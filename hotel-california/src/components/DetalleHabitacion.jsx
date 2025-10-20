import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DetalleHabitacion({ room, onVolver, onReservar }) {
    const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    };

return (
    <div className="detalle-habitacion">
        <button className="volver" onClick={onVolver}>
        ← Volver
        </button>

        <div className="detalle-contenido">
        {/* 🖼 Carrusel IZQUIERDA */}
        <div className="detalle-imagenes">
            <Slider {...sliderSettings}>
            {room.imagenes.map((img, i) => (
                <div key={i} className="slide-item">
                <img
                    src={img}
                    alt={`${room.nombre}-${i}`}
                    className="detalle-img"
                />
                </div>
            ))}
            </Slider>
        </div>

        {/* 📝 Info DERECHA */}
        <div className="detalle-info">
            <h3>{room.nombre}</h3>
            <p className="detalle-descripcion">{room.detalles}</p>
            <div className="detalle-servicios">
            {room.servicios.map((s, i) => (
                <span key={i}>{s}</span>
            ))}
            </div>
            <p className="detalle-precio">${room.precio} / noche</p>
            <button className="reservar-btn" onClick={onReservar}>
            Reservar ahora
            </button>
            </div>
        </div>
    </div>
    );
}

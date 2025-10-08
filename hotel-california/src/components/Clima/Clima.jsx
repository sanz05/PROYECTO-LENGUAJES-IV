import React, { useEffect, useState } from "react";
import "./Clima.css";

export default function Clima() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Santa Cruz,US&appid=aeec788d30c5504ee51a6c265f9f2bc5&units=metric&lang=es`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error obteniendo el clima:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <p className="clima-loading">Cargando clima...</p>;
  }

  return (
    <div className="clima-widget">
      <p>
        {weather.name} — {Math.round(weather.main.temp)}°C,{" "}
        {weather.weather[0].description.charAt(0).toUpperCase() +
          weather.weather[0].description.slice(1)}
      </p>
    </div>
  );
}

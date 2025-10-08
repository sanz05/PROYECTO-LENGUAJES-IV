import React from "react";
import hotelbg from "../assets/hotelbg.png"; // 👈 usa la imagen que generé

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${hotelbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#CDD1C4", // Ash gray
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "100px", // 👈 para no quedar bajo el navbar
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>
        Bienvenido al Hotel California
      </h1>
      <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        Disfruta de tu estancia.
      </p>
    </div>
  );
}

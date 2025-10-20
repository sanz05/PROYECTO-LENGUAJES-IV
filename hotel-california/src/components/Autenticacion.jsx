// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  useEffect(() => {

    const syncUsuario = () => {
      setUsuario(JSON.parse(localStorage.getItem("usuario")));
    };
    window.addEventListener("storage", syncUsuario);
    return () => window.removeEventListener("storage", syncUsuario);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { DondeEstamos } from "./components/DondeEstamos";
import { Producto } from "./components/Producto";
import { InstrumentoDetalle } from "./components/InstrumentoDetalle";
import { RutaPrivada } from "./controlAcceso/RutaPrivada";
import { GrillaInstrumentos } from "./components/GrillaInstrumentos";
import { Formulario } from "./components/Formulario";
import { NavBar } from "./components/NavBar";
import { RolUsuario } from "./controlAcceso/RolUsuario";
import { ChartsGoogle } from "./components/ChartsGoogle";

export function App() {

  const location = useLocation();
  const noNavBarRoutes = ['/login'];

  return (
    <>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}

      
    </>
  );
}

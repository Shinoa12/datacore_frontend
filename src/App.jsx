import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "./components/navigate/SideBar";
import Navbar from "./components/navigate/NavBar";
import Recursos from "./pages/Recursos";
import Historial from "./pages/Historial";
import Solicitudes from "./pages/Solicitudes";
import Home from "./pages/Home";
import UsuariosAutorizados from "./pages/UsuariosAutorizados";
import "./App.css";
import UsuariosNoAutorizados from "./pages/UsuariosNoAuthorizados";
import RecursosOfrecidos from "./pages/RecursosOfrecidos";
import CPUSolicitud from "./pages/CPUSolicitud";
import GPUSolicitud from "./pages/GPUSolicitud";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <div className="flex">
          <Sidebar sidebarToggle={sidebarToggle} />
          <Navbar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </div>

        <div className={`${sidebarToggle ? "" : "ml-64"}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route
              path="/usuarios-autorizados"
              element={<UsuariosAutorizados />}
            />
            <Route
              path="/usuarios-no-autorizados"
              element={<UsuariosNoAutorizados />}
            />
            <Route path="/recursos-ofrecidos" element={<RecursosOfrecidos />} />
            <Route path="/cpu-solicitud" element={<CPUSolicitud />} />
            <Route path="/gpu-solicitud" element={<GPUSolicitud />} />
            <Route path="/Recursos" element={<Recursos />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/Solicitudes" element={<Solicitudes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

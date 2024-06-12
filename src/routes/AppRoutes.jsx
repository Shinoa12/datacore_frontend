import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import "../App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import Sidebar from "../components/navigation/SideBar";
import Navbar from "../components/navigation/NavBar";
import Recursos from "../pages/Recursos";
import Historial from "../pages/Historial";
import Solicitudes from "../pages/Solicitudes";
import Home from "../pages/Home";
import UsuariosAutorizados from "../pages/UsuariosAutorizados";
import UsuariosDesautorizados from "../pages/UsuariosDesautorizados";
import RecursosOfrecidos from "../pages/RecursosOfrecidos";
import CPUSolicitud from "../pages/CPUSolicitud";
import GPUSolicitud from "../pages/GPUSolicitud";
import Ajustes from "../pages/Ajustes";
import Ayuda from "../pages/Ayuda";

export const AppRoutes = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="flex">
          <Sidebar sidebarToggle={sidebarToggle} />
          <Navbar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </div>

        <div className={`${sidebarToggle ?  "pt-24": "pt-24 ml-64"}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/usuarios-autorizados"
              element={<UsuariosAutorizados />}
            />
            <Route
              path="/usuarios-desautorizados"
              element={<UsuariosDesautorizados />}
            />
            <Route path="/recursos-ofrecidos" element={<RecursosOfrecidos />} />
            <Route path="/cpu-solicitud" element={<CPUSolicitud />} />
            <Route path="/gpu-solicitud" element={<GPUSolicitud />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="/ayuda" element={<Ayuda />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

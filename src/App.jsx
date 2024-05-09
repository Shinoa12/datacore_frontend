import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import React, { useState } from "react";
import Sidebar from './components/Navigate/SideBar';
import Navbar from './components/Navigate/NavBar';
import Recursos from './pages/Recursos'
import Historial from './pages/Historial'
import Home from './pages/Home'
import './App.css'
import UsuariosAutorizados from './pages/UsuariosAutorizados';
import UsuariosNoAutorizados from './pages/UsuariosNoAuthorizados';
import RecursosOfrecidos from './pages/RecursosOfrecidos';
import CPUSolicitud from './pages/CPUSolicitud';
import GPUSolicitud from './pages/GPUSolicitud';


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
            <Route
              path="/recursos-ofrecidos"
              element={<RecursosOfrecidos />}
            />
            <Route
              path="/cpu-solicitud"
              element={<CPUSolicitud />}
            />
            <Route
              path="/gpu-solicitud"
              element={<GPUSolicitud />}
            />
            <Route path="/Recursos" element={<Recursos />} />
            <Route path="/Historial" element={<Historial />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
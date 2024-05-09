import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import React, { useState } from "react";
import Sidebar from './components/Navigate/SideBar';
import Navbar from './components/Navigate/NavBar';
import Recursos from './pages/Recursos'
import Historial from './pages/Historial'
import Home from './pages/Home'
import UsuariosAutorizados from './pages/UsuariosAutorizados'
import './App.css'
import UsuariosNoAutorizados from './pages/UsuariosNoAuthorizados';


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
            <Route path="/Recursos" element={<Recursos />} />
            <Route path="/Historial" element={<Historial />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
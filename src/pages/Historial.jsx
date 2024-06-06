import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
//MUI
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

//APIs
import { getHistorial } from "../api/Historial";

function Historial() {
  const [rows, setRows] = useState([]);
  const [origialRows, setRowsR] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
    recurso: "",
    estado_solicitud: "",
    fecha_procesamiento: "",
    fecha_finalizada: "",
  });
  const columns = [
    { field: "fecha_registro", headerName: "Fecha", width: 70 },
    { field: "recurso", headerName: "Recurso", width: 100 },
    { field: "email", headerName: "Correo", width: 150 },
    { field: "estado_solicitud", headerName: "Estado", width: 150 },
    { field: "fecha_procesamiento", headerName: "Fecha de Inicio", width: 150 },
    { field: "fecha_finalizada", headerName: "Fecha de Fin", width: 150 },
    { field: "duracion", headerName: "Duracion", width: 100 },
  ];

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    getHistorial()
      .then((response) => {
        setRows(response.data);
        setRowsR(response.data);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  };

  const exportarSolicitudes = () => {
    const csvData = rows.map((row) => Object.values(row).join(",")).join("\n");
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "solicitudes.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    const filteredRows = origialRows.filter((row) => {
        return Object.keys(filters).every((key) => {
          if (filters[key] === "") {
            return true;
          }
          const rowValue =
            typeof row[key] === "string" ? row[key].toLowerCase() : row[key];
        //   console.log('rowValue:', rowValue);
        //   console.log('filter:', filters[key].toLowerCase());
        //   console.log('rowValue.includes(filters[key].toLowerCase()):', rowValue.includes(filters[key].toLowerCase()));
          return rowValue.includes(filters[key].toLowerCase());
        });
      });

    if (Object.values(filters).every((value) => value === "")) {
      setRows(origialRows);
    } else {
      setRows(filteredRows);
    }
  };

  return (
    <div className="row m-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Historial
      </h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>Correo</div>
        <div>
          <TextField
            id="outlined-size-small "
            defaultValue=""
            size="small"
            variant="standard"
            name="email"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>Recurso</div>
        <div>
          <TextField
            id="outlined-size-small "
            size="small"
            variant="standard"
            name="recurso"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>Estado</div>
        <div>
          <TextField
            id="outlined-size-small "
            size="small"
            variant="standard"
            name="estado_solicitud"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>Fecha Inicio</div>
        <div>
          <input
            type="date"
            id="start"
            name="fechaInicio"
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>Fecha Fin</div>
        <div>
          <input
            type="date"
            id="end"
            name="fechaFin"
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={handleSearch}
      >
        Buscar
      </Button>
      <DataGrid
        id="dgHistorial"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={exportarSolicitudes}
      >
        Exportar Solicitudes
      </Button>
    </div>
  );
}

export default Historial;

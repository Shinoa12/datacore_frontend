import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { parseISO, format } from 'date-fns';
import moment from 'moment';

//MUI
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
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
    { field: "fecha_registro", headerName: "Fecha", width: 200 },
    { field: "recurso", headerName: "Recurso", width: 300 },
    { field: "email", headerName: "Correo", width: 300 },
    { field: "estado_solicitud", headerName: "Estado", width: 150 },
    { field: "fecha_procesamiento", headerName: "Fecha de Inicio", width: 200 },
    { field: "fecha_finalizada", headerName: "Fecha de Fin", width: 200 },
    { field: "duracion", headerName: "Duracion", width: 100 },
  ];

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    getHistorial()
      .then((response) => {
        const formattedData = response.data.map(item => ({
          ...item,
          fecha_registro: format(parseISO(item.fecha_registro), 'dd/MM/yyyy hh:mm:ss a'),
          fecha_procesamiento: format(parseISO(item.fecha_procesamiento), 'dd/MM/yyyy hh:mm:ss a'),
          fecha_finalizada: format(parseISO(item.fecha_finalizada), 'dd/MM/yyyy hh:mm:ss a'),
      }));
        setRows(formattedData);
        setRowsR(formattedData);
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

          if (key === 'fecha_procesamiento') {
            const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A").toDate();
            const startDate = new Date(filters[key]);
            return date >= startDate;
          } else if ( key === 'fecha_finalizada'){
            const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A").toDate();
            const endDate = new Date(filters[key]);
            return date <= endDate;
          }else {
            const rowValue =
              typeof row[key] === "string" ? row[key].toLowerCase() : row[key];
            return rowValue.includes(filters[key].toLowerCase());
          }
        });
      });

    if (Object.values(filters).every((value) => value === "")) {
      setRows(origialRows);
    } else {
      setRows(filteredRows);
    }
  };

  return (
    <div className="row m-4" >
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Historial
      </h2>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>Correo</div>
    <TextField
        label="Correo"
        id="outlined-size-small "
        defaultValue=""
        size="small"
        name="email"
        onChange={handleInputChange}
    />
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>Recurso</div>
    <TextField
        label="Recurso"
        id="outlined-size-small "
        size="small"
        name="recurso"
        onChange={handleInputChange}
    />
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>Estado</div>
    <TextField
        label="Estado"
        id="outlined-size-small "
        size="small"
        name="estado_solicitud"
        onChange={handleInputChange}
    />
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>Fecha Inicio</div>
    <input
        type="date"
        id="start"
        name="fecha_procesamiento"
        onChange={handleInputChange}
    />
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>Fecha Fin</div>
    <input
        type="date"
        id="end"
        name="fecha_finalizada"
        onChange={handleInputChange}
    />
</div>

    <Box marginTop={5} marginBottom={5} display="flex" justifyContent="flex-end">
        <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
        >
            Buscar
        </Button>
    </Box>
    <Box sx={{ height: 400, width: "100%" }} className="mt-4">
      <DataGrid
          id="dgHistorial"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
      />
    </Box>
      
    <Box marginTop={5} display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={exportarSolicitudes}
      >
        Exportar Solicitudes
      </Button>
    </Box>
    </div>
  );
}

export default Historial;

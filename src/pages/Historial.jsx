import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import { addHours } from "date-fns";
import moment from "moment";

// MUI
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// APIs
import { getHistorial } from "../api/Historial";

// Components
import NoRowsOverlay from "../components/NoRowsOverlay";

function Historial() {
  const [rows, setRows] = useState([]);
  const [origialRows, setRowsR] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    email: "",
    recurso: "",
    estado_solicitud: "",
    fecha_procesamiento: "",
    fecha_finalizada: "",
    fecha_registro: "",
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
    setLoading(true);
    getHistorial()
      .then((response) => {
        const formattedData = response.data.map((item) => {
          const registroYear = parseISO(item.fecha_registro).getUTCFullYear();
          const procesamientoYear = parseISO(
            item.fecha_procesamiento
          ).getUTCFullYear();
          const finalizadaYear = parseISO(
            item.fecha_finalizada
          ).getUTCFullYear();

          return {
            ...item,

            fecha_registro:
              registroYear < 2000
                ? "-"
                : format(
                    addHours(parseISO(item.fecha_registro), 5),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
            fecha_procesamiento:
              procesamientoYear < 2000
                ? "-"
                : format(
                    addHours(parseISO(item.fecha_procesamiento), 5),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
            fecha_finalizada:
              finalizadaYear < 2000
                ? "-"
                : format(
                    addHours(parseISO(item.fecha_finalizada), 5),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
          };
        });

        setRows(formattedData);
        setRowsR(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      })
      .finally(() => {
        setLoading(false);
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

        if (key === "fecha_procesamiento") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const startDate = moment(filters[key]).startOf("day").toDate();
          return date >= startDate;
        } else if (key === "fecha_finalizada") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const endDate = moment(filters[key]).startOf("day").toDate();
          return date <= endDate;
        } else if (key === "fecha_registro") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const endDate = moment(filters[key]).startOf("day").toDate();
          return date.getTime() === endDate.getTime();
        } else {
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
    <div className="mx-8 my-6">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Historial
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Correo"
          id="outlined-size-small "
          defaultValue=""
          size="small"
          name="email"
          onChange={handleInputChange}
        />
        <TextField
          label="Recurso"
          id="outlined-size-small "
          size="small"
          name="recurso"
          onChange={handleInputChange}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="estado_solicitud"
            label="Estado"
            onChange={handleInputChange}
          >
            <MenuItem value={""}>Todos</MenuItem>
            <MenuItem value={"creada"}>creada</MenuItem>
            <MenuItem value={"cancelada"}>cancelada</MenuItem>
            <MenuItem value={"finalizada"}>finalizada</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div>Fecha Registro</div>
        <input
          type="date"
          id="end"
          name="fecha_registro"
          onChange={handleInputChange}
        />
        <div>Fecha Inicio</div>
        <input
          type="date"
          id="start"
          name="fecha_procesamiento"
          onChange={handleInputChange}
        />

        <div>Fecha Fin</div>
        <input
          type="date"
          id="end"
          name="fecha_finalizada"
          onChange={handleInputChange}
        />
      </div>

      <Box
        marginTop={5}
        marginBottom={5}
        display="flex"
        justifyContent="flex-end"
      >
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
          pageSizeOptions={[10, 20, 30, 40, 50]}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          loading={loading}
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

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const rows = [
  {
    id: 1,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 2,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 3,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 4,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 5,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 6,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 7,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
  {
    id: 8,
    duracion: "24h",
    fechaRegistro: "24/09/24 20:00",
    fechaInicio: "24/09/24 20:00",
    fechaFin: "24/09/24 20:00",
    estado: "Pendiente",
    cancelar: "",
    detalle: "",
    resultados: "",
  },
];

function Solicitudes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "duracion", headerName: "Duracion", width: 100 },
    { field: "fechaRegistro", headerName: "Fecha de Registro", width: 150 },
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 150 },
    { field: "fechaFin", headerName: "Fecha de Fin", width: 150 },
    { field: "estado", headerName: "Estado", width: 100 },
    {
      field: "cancelar",
      headerName: "Cancelar",
      sortable: false,
      renderCell: (params) => {
        return <Button startIcon={<CloseIcon />}></Button>;
      },
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            startIcon={<RemoveRedEyeIcon />}
            onClick={handleOpen}
          ></Button>
        );
      },
    },
    {
      field: "resultados",
      headerName: "Resultados",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        return <Button startIcon={<DownloadIcon />}>Descargar</Button>;
      },
    },
    /*
          {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
          },*/
  ];

  return (
    <div className="row m-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Solicitudes
      </h2>

      <Button variant="contained" startIcon={<AddIcon />}>
        Nueva Solicitud
      </Button>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <Button variant="contained" startIcon={<ExitToAppIcon />}>
        Regresar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{ color: "rgb(4, 35, 84)" }}
            className=" font-bold text-3xl mb-4"
          >
            Detalle de Solicitud
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Nombre</div>
            <div>
              <TextField
                id="outlined-size-small"
                defaultValue="Solicitud 3"
                size="small"
                variant="standard"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Fecha de registro</div>
            <div>
              <TextField
                id="outlined-size-small"
                defaultValue="28/09/2024 20:00"
                size="small"
                variant="standard"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Estado</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                defaultValue="En proceso"
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>CPU</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                defaultValue="Intel® Core™ i9 processor 14900T"
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Cantidad de núcleos</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                defaultValue="24"
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Frecuencia del procesador</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                defaultValue="5.50 GHz"
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Tamaño de memoria RAM</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                defaultValue="192 GB"
                size="small"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Solicitudes;

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
//MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import Modal from "@mui/material/Modal";
import DialogContentText from "@mui/material/DialogContentText";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

//APIs
import { getAllSolicitudes } from "../api/Solicitudes";
import { getSolicitudDetalle } from "../api/Solicitudes";
import { getSolicitudResultado } from "../api/Solicitudes";
import { deleteSolicitud } from "../api/Solicitudes";

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



function Solicitudes() {
  
  //Detalle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Cancelar
  const [openC, setOpenC] = React.useState(false);

  const handleClickOpenC = () => {
    setOpenC(true);
  };

  const handleCloseC = () => {
    setOpenC(false);
  };

  //Acciones

  useEffect(() => {
    loadPage();
}, []);

  //Redirigir a nueva solicitud
  const nuevaSolicitud = () => {
    useNavigate("/recursos-ofrecidos");
  };

  //Exportar Solicitudes
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

  //Cargar resultado de solicitud *
  const descargarDoc = () => {
    var link = document.createElement("a");
    link.href = "https://media.tenor.com/-bf6dnXT4nsAAAAe/cat-cat-butt.png";
    link.download = "cat-cat-butt.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    getSolicitudResultado()
    .then((response) => {

    })
    .catch((error) => {
      console.error("Error fetching solicitudes:", error);
    });
  };

  //Cargar datos *
  const loadPage = () => {
    getAllSolicitudes()
      .then((response) => {
        const data = response.data;
        rows = data.map((item) => ({
          id: item.id,
          duracion: item.duracion,
          fechaRegistro: item.fechaRegistro,
          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,
          estado: item.estado,
          cancelar: "",
          detalle: "",
          resultados: "",
        }));
        setRows(rows);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  };

  const [rows, setRows] = useState([]);

  //Cargar detalles
  const cargarDetalles =()=>{
    getSolicitudDetalle()
      .then((response) => {

      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  }

  //Cancelar solicitud
  const cancelarSolicitudes =()=>{
    deleteSolicitud()
    .then((response) => {

    })
    .catch((error) => {
      console.error("Error fetching solicitudes:", error);
    });
  }


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
        return (
          <Button startIcon={<CloseIcon />} onClick={handleClickOpenC}></Button>
        );
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
        return (
          <Button startIcon={<DownloadIcon />} onClick={descargarDoc}>
            Descargar
          </Button>
        );
      },
    },
  ];

  // Cuerpo de la pagina
  return (
    <div className="row m-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Solicitudes
      </h2>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={nuevaSolicitud}
      >
        Nueva Solicitud
      </Button>

      <DataGrid
      id = "dgSolicitudes"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={exportarSolicitudes}
      >
        Exportar Solicitudes
      </Button>

      {/* Detalle de la solicitud */}
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

      {/* Confirmar la cancelacion */}
      <Dialog
        open={openC}
        onClose={handleCloseC}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Cancelar la solicitud seleccionada?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseC} autoFocus>
            No
          </Button>
          <Button onClick={handleCloseC}>Sí</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Solicitudes;

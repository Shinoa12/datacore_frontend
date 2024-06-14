import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { parseISO, format } from "date-fns";

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
  const [lid, setTextId] = useState();
  const [lfecharegistro, setTextFechaRegistro] = useState();
  const [lestado, setTextEstado] = useState();
  const [lcpu, setTextCPU] = useState();
  const [lnucleo, setTextCantidadNucleo] = useState();
  const [lfrecuencia, setTextFrecuenciaProcesador] = useState();
  const [ltamano, setTextTamanoRAM] = useState();
  const [selectedIdSolicitud, setSelectedIdSolicitud] = useState();
  const [loading, setLoading] = useState(false);

  //Detalle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const abrirdetalle = (id_solicitud) => {
    console.log("Detalle: " + id_solicitud);
    cargarDetalles(id_solicitud);

    setOpen(true);
  };
  //Cancelar
  const [openC, setOpenC] = React.useState(false);

  const abrirCancelar = (id_solicitud) => {
    setSelectedIdSolicitud(id_solicitud);
    setOpenC(true);
  };

  const handleCloseC = () => {
    setOpenC(false);
  };

  const confirmarCancelar = () => {
    cancelarSolicitudes();
    setOpenC(false);
  };

  //Acciones

  useEffect(() => {
    loadPage();
  }, []);
  const navigate = useNavigate();
  //Redirigir a nueva solicitud
  const nuevaSolicitud = () => {
    navigate("/recursos-ofrecidos");
  };

  //Cargar resultado de solicitud *
  const descargarDoc = (id_solicitud) => {
    getSolicitudResultado(id_solicitud)
      .then((response) => {
        // Assuming the response is a Blob
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL
        const urlObject = new URL(url);
        const pathname = urlObject.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  };

  const [rows, setRows] = useState([]);

  //Cargar datos *
  const loadPage = () => {
    setLoading(true);
    getAllSolicitudes(localStorage.getItem("id_user"))
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          fecha_registro: format(
            parseISO(item.fecha_registro),
            "dd/MM/yyyy hh:mm:ss a"
          ),
          fecha_procesamiento: format(
            parseISO(item.fecha_procesamiento),
            "dd/MM/yyyy hh:mm:ss a"
          ),
          fecha_finalizada: format(
            parseISO(item.fecha_finalizada),
            "dd/MM/yyyy hh:mm:ss a"
          ),
        }));

        setRows(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [modalData, setModalData] = useState({});
  //Cargar detalles
  const cargarDetalles = (id_solicitud) => {
    getSolicitudDetalle(id_solicitud)
      .then((response) => {
        // Assuming response.data.fecha_registro is in ISO format
        const date = parseISO(response.data.fecha_registro);
        const formattedDate = format(date, "dd/MM/yyyy hh:mm:ss a");

        setTextId(response.data.id_solicitud);
        setTextFechaRegistro(formattedDate);
        setTextEstado(response.data.estado_solicitud);
        setTextCPU(response.data.nombre);
        setTextCantidadNucleo(response.data.numero_nucleos);
        setTextFrecuenciaProcesador(response.data.frecuencia);
        setTextTamanoRAM(response.data.tamano_ram);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  };

  //Cancelar solicitud
  function cancelarSolicitudes() {
    deleteSolicitud(selectedIdSolicitud)
      .then((response) => {
        loadPage();
        console.log(response.data.id_solicitud + ": cancelado");
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  }

  const columns = [
    { field: "id_solicitud", headerName: "ID", width: 70 },
    { field: "duracion", headerName: "Duracion", width: 150 },
    { field: "fecha_registro", headerName: "Fecha de Registro", width: 200 },
    { field: "fecha_procesamiento", headerName: "Fecha de Inicio", width: 200 },
    { field: "fecha_finalizada", headerName: "Fecha de Fin", width: 200 },
    { field: "estado_solicitud", headerName: "Estado", width: 200 },
    {
      field: "cancelar",
      headerName: "Cancelar",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.row.estado_solicitud === "creada" ? (
          <Button
            startIcon={<CloseIcon />}
            onClick={() => abrirCancelar(params.row.id_solicitud)}
          ></Button>
        ) : null;
      },
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            startIcon={<RemoveRedEyeIcon />}
            onClick={() => abrirdetalle(params.row.id_solicitud)}
          ></Button>
        );
      },
    },
    {
      field: "resultados",
      headerName: "Resultados",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => descargarDoc(params.row.id_solicitud)}
          >
            Descargar
          </Button>
        );
      },
    },
  ];

  // Cuerpo de la pagina
  return (
    <div className="mx-8 my-6">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Solicitudes
      </h2>

      <Box
        marginBottom={5}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          marginBottom={5}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={nuevaSolicitud}
        >
          Nueva Solicitud
        </Button>
      </Box>

      <DataGrid
        autoHeight
        id_solicitud="dgSolicitudes"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        loading={loading}
      />

      {/*
      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={exportarSolicitudes}
      >
        Exportar Solicitudes
      </Button>
*/}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              label="ID"
              id="outlined-size-small "
              value={lid}
              fullWidth
            />

            <TextField
              label="Fecha de registro"
              id="outlined-size-small "
              value={lfecharegistro}
              fullWidth
            />

            <TextField
              label="Estado"
              id="outlined-size-small "
              value={lestado}
              fullWidth
            />

            <TextField
              label="CPU"
              id="outlined-size-small "
              value={lcpu}
              fullWidth
            />

            <TextField
              label="Cantidad de núcleos"
              id="outlined-size-small"
              value={lnucleo}
              fullWidth
            />

            <TextField
              label="Frecuencia del procesador"
              id="outlined-size-small"
              value={lfrecuencia}
              fullWidth
            />

            <TextField
              label="Tamaño de memoria RAM"
              id="outlined-size-small "
              value={ltamano}
              fullWidth
            />
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
          <Button onClick={confirmarCancelar}>Sí</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Solicitudes;

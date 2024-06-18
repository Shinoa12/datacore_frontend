import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CPUDropdown from "../components/CPUDropdown";
import DiscardChangesModal from "../components/DiscardChangesModal";
import LibrariesModal from "../components/LibrariesModal";
import SuccessModal from "../components/SuccessModal";
import SolicitudHelpModal from "../components/SolicitudHelpModal";
import { createSolicitud } from "../api/Solicitudes";
import { getHerramientasPorCPU } from "../api/Herramientas";

const forbiddenExtensions = [
  "pdf",
  "doc",
  "docx",
  "png",
  "jpg",
  "jpeg",
  "mp3",
  "mp4",
  "exe",
  "zip",
  "rar",
  "tar",
  "gz",
  "7z",
  "iso",
];

function CPUSolicitud() {
  const initialCpuState = {
    frecuencia_cpu: "",
    id_recurso: {
      estado: true,
      id_recurso: 1,
      solicitudes_encoladas: "",
      tamano_ram: "",
      ubicacion: "",
    },
    nombre: "",
    numero_nucleos_cpu: "",
  };

  const [selectedCPU, setSelectedCPU] = useState(initialCpuState);
  const [herramientas, setHerramientas] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [executionParameters, setExecutionParameters] = useState("");
  const [showDropMessage, setShowDropMessage] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLibrariesModal, setShowLibrariesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [herramientasFetched, setHerramientasFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // Funciones y handlers para arrastre, subida normal y elim. de archivos

  const filterFiles = (files) => {
    return files.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return !forbiddenExtensions.includes(fileExtension);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newFiles = filterFiles(Array.from(event.dataTransfer.files));
    const invalidFiles = Array.from(event.dataTransfer.files).filter(
      (file) => !filterFiles([file]).length
    );

    if (invalidFiles.length > 0) {
      setErrorMessage("Archivo no válido");
    } else {
      setErrorMessage("");
    }

    if (newFiles.length > 0) {
      setShowDropMessage(false);
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = (event) => {
    const newFiles = filterFiles(Array.from(event.target.files));
    const invalidFiles = Array.from(event.target.files).filter(
      (file) => !filterFiles([file]).length
    );

    if (invalidFiles.length > 0) {
      setErrorMessage("Archivo no válido");
    } else {
      setErrorMessage("");
    }

    if (newFiles.length > 0) {
      setShowDropMessage(false);
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    if (selectedFiles.length === 1) {
      setShowDropMessage(true);
    }
  };

  // Handlers para modals

  const openLibrariesModal = () => {
    setShowLibrariesModal(true);
  };

  const closeLibrariesModal = () => {
    setShowLibrariesModal(false);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/solicitudes");
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  const openDiscardModal = () => {
    setShowDiscardModal(true);
  };

  const closeDiscardModal = () => {
    setShowDiscardModal(false);
  };

  const handleCancelClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }

    closeDiscardModal();
  };

  const handleConfirmClose = () => {
    navigate("/recursos-ofrecidos");
  };

  // Handlers para cambios en variables

  const handleExecutionParametersChange = (event) => {
    setExecutionParameters(event.target.value);
  };

  const handleCPUChange = (event) => {
    setSelectedCPU(event.target.value);
    setHerramientas([]);
  };

  // Obtiene la lista de herramientas al cambiar de CPU
  useEffect(() => {
    const fetchHerramientas = async () => {
      setHerramientasFetched(false);
      try {
        const response = await getHerramientasPorCPU(
          selectedCPU.id_recurso.id_recurso
        );
        setHerramientas(response.data);
        setHerramientasFetched(true);
      } catch (error) {
        console.error("Error al cargar herramientas:", error);
      }
    };

    if (selectedCPU.id_recurso.id_recurso) {
      fetchHerramientas();
    }
  }, [selectedCPU]);

  // Crea la solicitud
  const handleCreate = async () => {
    setSubmitting(true);

    await createSolicitud(
      localStorage.getItem("id_user"),
      selectedCPU.id_recurso.id_recurso,
      executionParameters,
      selectedFiles
    )
      .then((response) => {
        openSuccessModal();
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="mx-8 my-6">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">CPU disponibles</p>
      </Box>

      <Box sx={{ display: "flex", gap: "2rem" }}>
        {/* Información principal */}
        <Box sx={{ flex: 1 }}>
          {/* Selector de recurso */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ color: "primary.main", mb: 2 }}>
              <p className="font-bold text-xl">Recurso computacional</p>
            </Box>
            <CPUDropdown value={selectedCPU} onChange={handleCPUChange} />
          </Box>

          {/* Detalle */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ color: "primary.main", mb: 2 }}>
              <p className="font-bold text-xl">Detalle del recurso</p>
            </Box>
            <Box
              sx={{
                p: 3,
                width: "100%",
                backgroundColor: "#F0F0F0",
                borderRadius: "0.25rem",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}
              >
                <p className="font-bold">Cantidad de núcleos</p>
                {selectedCPU.numero_nucleos_cpu !== "" && (
                  <p className="font-semibold">
                    {selectedCPU.numero_nucleos_cpu}
                  </p>
                )}
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
              >
                <p className="font-bold">Frecuencia del procesador</p>
                {selectedCPU.frecuencia_cpu !== "" && (
                  <p className="font-semibold">
                    {parseFloat(selectedCPU.frecuencia_cpu).toFixed(2)} GHz
                  </p>
                )}
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
              >
                <p className="font-bold">Tamaño de memoria RAM</p>
                {selectedCPU.id_recurso.tamano_ram !== "" && (
                  <p className="font-semibold">
                    {selectedCPU.id_recurso.tamano_ram} GB
                  </p>
                )}
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}
              >
                <p className="font-bold">Solicitudes en cola</p>
                {selectedCPU.id_recurso.solicitudes_encoladas !== "" && (
                  <p className="font-semibold">
                    {selectedCPU.id_recurso.solicitudes_encoladas}
                  </p>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              startIcon={<LibraryBooksIcon />}
              onClick={openLibrariesModal}
              fullWidth
              disabled={!herramientasFetched}
            >
              Ver librerías
            </Button>
          </Box>
        </Box>

        {/* Adicionales */}
        <Box sx={{ flex: 1 }}>
          {/* Archivos */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                color: "primary.main",
                mb: 2,
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="font-bold text-xl">Archivos</p>
              <p className="font-semibold" style={{ color: "red" }}>
                {errorMessage}
              </p>
            </Box>
            <Box
              sx={{
                px: 1,
                border: "2px dashed #ccc",
                borderRadius: "0.25rem",
                textAlign: "center",
                height: "10rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                justifyContent: showDropMessage ? "center" : "flex-start",
                alignItems: showDropMessage ? "center" : "flex-start",
                overflow: "auto",
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {selectedFiles.length === 0 ? (
                <>
                  <UploadFileIcon
                    fontSize="large"
                    sx={{ color: "primary.main" }}
                  />
                  <Box>
                    <p>Arrastra archivos aquí o</p>
                    <Button
                      component="label"
                      variant="contained"
                      tabIndex={-1}
                      sx={{ mt: 1 }}
                    >
                      Elige archivos
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        multiple
                      ></input>
                    </Button>
                  </Box>
                </>
              ) : (
                <List>
                  {selectedFiles.map((file, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveFile(file)}
                          sx={{ color: "primary.main" }}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon sx={{ color: "primary.main" }}>
                        <InsertDriveFileIcon />
                      </ListItemIcon>
                      <ListItemText primary={file.name} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Parámetros */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ color: "primary.main", mb: 2 }}>
              <p className="font-bold text-xl">Parámetros de ejecución</p>
            </Box>
            <Box>
              <TextField
                multiline
                fullWidth
                placeholder="Ingresa parámetros aquí..."
                rows={6}
                InputProps={{
                  style: {
                    fontFamily: "monospace",
                  },
                }}
                value={executionParameters}
                onChange={handleExecutionParametersChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Botones */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
          onClick={openHelpModal}
        >
          Necesito ayuda
        </Button>
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Button
            variant="outlined"
            onClick={openDiscardModal}
            disabled={submitting}
          >
            Regresar
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={submitting}
          >
            Crear
          </Button>
        </Box>
      </Box>

      <LibrariesModal
        open={showLibrariesModal}
        onClose={closeLibrariesModal}
        herramientas={herramientas}
      />

      <DiscardChangesModal
        open={showDiscardModal}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
      ></DiscardChangesModal>

      <SuccessModal
        open={showSuccessModal}
        onClose={closeSuccessModal}
        content="Recibirás un correo cuando el recurso te sea asignado."
      />

      <SolicitudHelpModal open={showHelpModal} onClose={closeHelpModal} />
    </div>
  );
}

export default CPUSolicitud;

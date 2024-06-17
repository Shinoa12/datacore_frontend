import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import CPUDropdown from "../components/CPUDropdown";
import SuccessModal from "../components/SuccessModal";
import SolicitudHelpModal from "../components/SolicitudHelpModal";

import { createSolicitud } from "../api/Solicitudes";
import {
  getHerramientasPorCPU,
  getLibreriasPorHerramienta,
} from "../api/Herramientas";

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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDropMessage, setShowDropMessage] = useState(true);
  const [executionParameters, setExecutionParameters] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCPU, setSelectedCPU] = useState(initialCpuState);
  const [showLibrariesModal, setShowLibrariesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [herramientas, setHerramientas] = useState([]);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);
  const [librerias, setLibrerias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowLibrariesModal(true);
  };

  const closeModal = () => {
    setShowLibrariesModal(false);
  };

  const forbiddenExtensions = ["pdf", "doc", "docx", "png", "jpg", "jpeg", "mp3", "mp4","exe", "zip", "rar", "tar", "gz", "7z", "iso"];
  const [errorMessage, setErrorMessage] = useState("");

  const filterFiles = (files) => {
    return files.filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return !forbiddenExtensions.includes(fileExtension);
    });
  };

  const handleFileChange = (event) => {
    const newFiles = filterFiles(Array.from(event.target.files));
    const invalidFiles = Array.from(event.target.files).filter(file => !filterFiles([file]).length);
  
    if (invalidFiles.length > 0) {
      setErrorMessage("Archivo no válido");
    } else {
      setErrorMessage("");
    }
  
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...newFiles,
    ]);
    setShowDropMessage(false);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    const newFiles = filterFiles(Array.from(event.dataTransfer.files));
    const invalidFiles = Array.from(event.dataTransfer.files).filter(file => !filterFiles([file]).length);
  
    if (invalidFiles.length > 0) {
      setErrorMessage("Archivo no válido");
    } else {
      setErrorMessage("");
    }
  
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...newFiles,
    ]);
    setShowDropMessage(false);
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    if (selectedFiles.length === 1) {
      setShowDropMessage(true);
    }
  };

  const handleExecutionParametersChange = (event) => {
    setExecutionParameters(event.target.value);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/solicitudes");
  };

  const handleCrearClick = async () => {
    setLoading(true);

    await createSolicitud(
      localStorage.getItem("id_user"),
      selectedCPU.id_recurso.id_recurso,
      executionParameters,
      selectedFiles
    )
      .then((response) => {
        console.log("Solicitud creada con éxito:", response.data);
        openSuccessModal();
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModalOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCPUChange = (event) => {
    setSelectedCPU(event.target.value);
    setSelectedHerramienta(null);
    setHerramientas([]);
    setLibrerias([]);
  };

  const handleHerramientaChange = (event) => {
    const herramienta = event.target.value;
    console.log("Selected herramienta:", herramienta);
    setSelectedHerramienta(herramienta);
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  useEffect(() => {
    const fetchHerramientas = async () => {
      try {
        console.log(
          "Fetching herramientas for CPU ID:",
          selectedCPU.id_recurso.id_recurso
        );
        const herramientasRes = await getHerramientasPorCPU(
          selectedCPU.id_recurso.id_recurso
        );
        console.log("Herramientas fetched:", herramientasRes.data);
        setHerramientas(herramientasRes.data);
      } catch (error) {
        console.error("Error al cargar herramientas:", error);
      }
    };

    if (selectedCPU.id_recurso.id_recurso) {
      fetchHerramientas();
    }
  }, [selectedCPU]);

  useEffect(() => {
    const fetchLibrerias = async () => {
      try {
        if (selectedHerramienta && selectedHerramienta.id_herramienta) {
          console.log(
            "Fetching librerias for Herramienta ID:",
            selectedHerramienta.id_herramienta
          );
          const libreriasRes = await getLibreriasPorHerramienta(
            selectedHerramienta.id_herramienta
          );
          console.log("Librerías obtenidas:", libreriasRes.data);
          setLibrerias(libreriasRes.data);
        } else {
          console.log("No herramienta selected or herramienta ID is missing.");
        }
      } catch (error) {
        console.error("Error al cargar librerías:", error);
      }
    };

    fetchLibrerias();
  }, [selectedHerramienta]);

  const filteredLibrerias = librerias.filter((libreria) =>
    libreria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="mx-8 my-6">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
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
              onClick={openModal}
              fullWidth
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
              }}
            >
              <p className="font-bold text-xl">Archivos</p>
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
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                position: "relative"
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
              {errorMessage && (
                <Box sx={{ mt: 1, color: "red", position: "relative", bottom: 10 }}>
                  {errorMessage}
                </Box>
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
          onClick={openHelpModal}
        >
          Necesito ayuda
        </Button>
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Button component={Link} to="/recursos-ofrecidos" variant="outlined">
            Regresar
          </Button>
          <Button variant="contained" onClick={handleCrearClick}>
            Crear
          </Button>
        </Box>
      </Box>
      {showLibrariesModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: "1001",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "600px",
              height: "80%",
              maxHeight: "600px",
              textAlign: "left",
            }}
          >
            <h2
              style={{ color: "rgb(4, 35, 84)" }}
              className="font-bold text-3xl mb-4"
            >
              Librerías
            </h2>
            <span
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: "24px" }} />
            </span>
            {selectedCPU.id_recurso.id_recurso && herramientas.length > 0 && (
              <FormControl required sx={{ minWidth: 240, width: "100%" }}>
                <InputLabel id="modal-herramientas-label">
                  Herramientas
                </InputLabel>
                <Select
                  labelId="modal-herramientas-label"
                  id="modal-herramientas"
                  value={selectedHerramienta || ""}
                  onChange={handleHerramientaChange}
                  label="Herramientas"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <MenuItem value="">
                    <em>Seleccionar opción</em>
                  </MenuItem>
                  {herramientas.map((herramienta) => (
                    <MenuItem
                      key={herramienta.id_herramienta}
                      value={herramienta}
                    >
                      {herramienta.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {selectedHerramienta && (
              <div>
                <br></br>
                <p>
                  <strong>
                    Herramienta seleccionada: {selectedHerramienta.nombre}
                  </strong>
                </p>
                <TextField
                  label="Buscar"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                />
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <TableContainer component={Paper}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Librería</TableCell>
                          <TableCell>Versión</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredLibrerias.map((libreria) => (
                          <TableRow key={libreria.id}>
                            <TableCell>{libreria.nombre}</TableCell>
                            <TableCell>{libreria.version}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}

            <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
              <strong
                style={{
                  fontSize: "15px",
                  marginBottom: "10px",
                  color: "rgb(4, 35, 84)",
                }}
              >
                Si NO encontraste tu librería aquí dirígete al icono de ayuda en
                la sección anterior y comunícate con nuestro equipo.
              </strong>
            </div>
          </div>
        </div>
      )}

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

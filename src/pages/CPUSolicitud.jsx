import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CPUDropdown from "../components/CPUDropdown";
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ModalSolicitudExito from "../components/ModalSolicitudExito";
import manualPdf from "../assets/manual_investigador.pdf";
import { createSolicitud } from "../api/Solicitudes";

function CPUSolicitud() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDropMessage, setShowDropMessage] = useState(true);
  const [executionParameters, setExecutionParameters] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCPU, setSelectedCPU] = useState({
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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(event.target.files),
    ]);
    setShowDropMessage(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(event.dataTransfer.files),
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

  async function handleCrearClick() {
    await createSolicitud(
      localStorage.getItem("id_user"),
      selectedCPU.id_recurso.id_recurso,
      executionParameters,
      selectedFiles
    )
      .then((response) => {
        console.log("Solicitud creada con éxito:", response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
      });
  }

  const handleModalOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCPUChange = (event) => {
    setSelectedCPU(event.target.value);
    console.log(selectedCPU);
  };

  return (
    <div className="mx-8 my-6">
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
                <p className="font-semibold">
                  {selectedCPU.numero_nucleos_cpu}
                </p>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
              >
                <p className="font-bold">Frecuencia del procesador</p>
                <p className="font-semibold">
                  {parseFloat(selectedCPU.frecuencia_cpu).toFixed(2)} GHz
                </p>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
              >
                <p className="font-bold">Tamaño de memoria RAM</p>
                <p className="font-semibold">
                  {selectedCPU.id_recurso.tamano_ram} GB
                </p>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}
              >
                <p className="font-bold">Solicitudes en cola</p>
                <p className="font-semibold">
                  {selectedCPU.id_recurso.solicitudes_encoladas}
                </p>
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

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem" }}>
        <Button component={Link} to="/recursos-ofrecidos" variant="outlined">
          Regresar
        </Button>
        <Button variant="contained" onClick={handleCrearClick}>
          Crear
        </Button>
      </Box>

      {isModalOpen && (
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
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: "1000",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "1000px",
              height: "80%",
              maxHeight: "800px",
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
            <FormControl required sx={{ minWidth: 240, width: "100%" }}>
              <InputLabel id="modal-herramientas-label">
                Herramientas
              </InputLabel>
              <Select
                labelId="modal-herramientas-label"
                id="modal-herramientas"
                value={selectedOption}
                onChange={handleModalOptionChange}
                label="Herramientas"
                style={{ width: "50%", marginTop: "20px" }}
              >
                <MenuItem value="">Seleccionar opción</MenuItem>
                <MenuItem value="opcion1">Opción 1</MenuItem>
                <MenuItem value="opcion2">Opción 2</MenuItem>
                <MenuItem value="opcion3">Opción 3</MenuItem>
              </Select>
            </FormControl>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
              }}
            >
              <strong
                style={{
                  fontSize: "20px",
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

      {showModal && <ModalSolicitudExito />}
    </div>
  );
}

export default CPUSolicitud;

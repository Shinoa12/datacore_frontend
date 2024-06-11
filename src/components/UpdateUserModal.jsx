import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import LoadingOverlay from "./LoadingOverlay";
import {
  getAllFacultad,
  getAllEspecialidadPorFacultad,
  getAllEstadoPersona,
  updateUser,
  getUserById,
} from "../api/Users";

function UpdateUserModal({ open, onClose, onSuccess, id }) {
  const initialFormData = {
    correo: "",
    nombres: "",
    apellidos: "",
    recursos_max: 0,
    facultad: "",
    especialidad: "",
    estado: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [facultadList, setFacultadList] = useState([]);
  const [especialidadList, setEspecialidadList] = useState([]);
  const [estadoPersonaList, setEstadoPersonaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = (event, reason) => {
    if (
      reason &&
      (reason === "backdropClick" || (saving && reason === "escapeKeyDown"))
    ) {
      return;
    }
    onClose();
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const userData = {
      id_facultad: formData.facultad,
      id_especialidad: formData.especialidad,
      id_estado_persona: formData.estado,
    };
    try {
      await updateUser(id, userData);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error al editar usuario:", error);
    } finally {
      setSaving(false);
    }
  };

  const fetchFacultadList = async () => {
    const response = await getAllFacultad();
    setFacultadList(response.data);
  };

  const fetchEspecialidadesPorFacultad = async (idFacultad) => {
    const response = await getAllEspecialidadPorFacultad(idFacultad);
    setEspecialidadList(response.data);
  };

  const fetchEstadoPersonaList = async () => {
    const response = await getAllEstadoPersona();
    setEstadoPersonaList(response.data);
  };

  const fetchSelectedUser = async (id) => {
    setLoading(true);
    try {
      const response = await getUserById(id);
      const data = response.data;
      const user = {
        correo: data.email,
        nombres: data.first_name,
        apellidos: data.last_name,
        recursos_max: data.recursos_max,
        facultad: data.id_facultad,
        especialidad: data.id_especialidad,
        estado: data.id_estado_persona,
      };
      setFormData(user);
      await fetchEspecialidadesPorFacultad(user.facultad);
    } catch (error) {
      console.error("Error al cargar datos de usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultadList();
    fetchEstadoPersonaList();
  }, []);

  useEffect(() => {
    if (id !== 0) {
      fetchSelectedUser(id);
    }
  }, [id]);

  // Actualizar especialidades al cambiar facultad
  useEffect(() => {
    if (formData.facultad !== "") {
      setFormData({
        ...formData,
        especialidad: "",
      });
      fetchEspecialidadesPorFacultad(formData.facultad);
    }
  }, [formData.facultad]);

  // Establecer como especialidad el primer valor
  useEffect(() => {
    if (especialidadList.length > 0) {
      setFormData({
        ...formData,
        especialidad: especialidadList[0].id_especialidad,
      });
    }
  }, [especialidadList]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
      >
        {saving && (
          <LoadingOverlay
            backgroundColor={"rgba(255, 255, 255, 0.5)"}
            content={"Guardando..."}
          />
        )}
        <DialogTitle
          sx={{ m: 0, p: 2, color: "primary.main" }}
          id="dialog-title"
        >
          Editar usuario
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 2, position: "relative" }}>
          {loading && (
            <LoadingOverlay
              backgroundColor={"white"}
              content={"Cargando datos..."}
            />
          )}
          {/* Nombres */}
          <TextField
            margin="dense"
            id="nombres"
            name="nombres"
            label="Nombres"
            type="text"
            fullWidth
            value={formData.nombres}
            onChange={handleChange}
            disabled
          />

          {/* Apellidos */}
          <TextField
            margin="dense"
            id="apellidos"
            name="apellidos"
            label="Apellidos"
            type="text"
            fullWidth
            value={formData.apellidos}
            onChange={handleChange}
            disabled
          />

          {/* Correo */}
          <TextField
            autoFocus
            margin="dense"
            id="correo"
            name="correo"
            label="Correo"
            type="text"
            fullWidth
            value={formData.correo}
            onChange={handleChange}
            disabled
          />

          {/* Recursos máximos */}
          <TextField
            margin="dense"
            id="recursos_max"
            name="recursos_max"
            label="Recursos máximos"
            type="number"
            fullWidth
            value={formData.recursos_max}
            onChange={handleChange}
            disabled
          />

          {/* Estado */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="estado-label">
              {formData.estado !== "" ? "Estado" : "Cargando estados..."}
            </InputLabel>
            <Select
              labelId="estado-label"
              id="estado"
              name="estado"
              label="Estado"
              value={estadoPersonaList.length > 0 ? formData.estado : ""}
              onChange={handleChange}
              disabled={formData.estado === "" || saving}
            >
              {estadoPersonaList.map(({ id_estado_persona, nombre }) => (
                <MenuItem key={id_estado_persona} value={id_estado_persona}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Facultad */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="facultad-label">
              {formData.facultad !== "" ? "Facultad" : "Cargando facultades..."}
            </InputLabel>
            <Select
              labelId="facultad-label"
              id="facultad"
              name="facultad"
              label="Facultad"
              value={facultadList.length > 0 ? formData.facultad : ""}
              onChange={handleChange}
              disabled={
                formData.facultad === "" ||
                formData.especialidad === "" ||
                saving
              }
            >
              {facultadList.map(({ id_facultad, nombre }) => (
                <MenuItem key={id_facultad} value={id_facultad}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Especialidad */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="especialidad-label">
              {formData.especialidad !== ""
                ? "Especialidad"
                : "Cargando especialidades..."}
            </InputLabel>
            <Select
              labelId="especialidad-label"
              id="especialidad"
              name="especialidad"
              label="Especialidad"
              value={
                especialidadList.length > 0 && !loading
                  ? formData.especialidad
                  : ""
              }
              onChange={handleChange}
              disabled={formData.especialidad === "" || saving}
            >
              {especialidadList.map(({ id_especialidad, nombre }) => (
                <MenuItem key={id_especialidad} value={id_especialidad}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end", p: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              saving || Object.values(formData).some((value) => value === "")
            }
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateUserModal;

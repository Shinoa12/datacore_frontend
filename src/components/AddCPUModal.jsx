import { useEffect, useState } from "react";
import { createCPU } from "../api/RecursoDropdown";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import DiscardChangesModal from "./DiscardChangesModal";

function AddCPUModal({ open, onClose, onSuccess }) {
  const initialFormData = {
    nombre: "",
    numNucleos: "",
    frecuencia: "",
    ram: "",
    ubicacion: "",
    estado: "",
  };

  const initialFormErrors = {
    nombre: false,
    numNucleos: false,
    frecuencia: false,
    ram: false,
    ubicacion: false,
    estado: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Establece el formulario como válido si todos los campos están llenos
  useEffect(() => {
    const valid = Object.values(formData).every((value) => value.trim() !== "");
    setIsFormValid(valid);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === "",
    });
  };

  const resetForms = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  };

  const returnToTable = () => {
    onClose();
    resetForms();
  };

  const toggleDiscardModal = () => {
    setShowDiscardModal(!showDiscardModal);
  };

  // Abre el modal de confirmación de descarte si hay datos en el formulario
  const handleClose = () => {
    if (Object.values(formData).some((value) => value.trim() !== "")) {
      toggleDiscardModal();
    } else {
      returnToTable();
    }
  };

  const handleCancelClose = (event, reason) => {
    // Omite clics fuera del modal de confirmación de descarte
    if (reason && reason === "backdropClick") {
      return;
    }
    toggleDiscardModal();
  };

  const handleConfirmClose = () => {
    toggleDiscardModal();
    returnToTable();
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      const cpuData = {
        id_recurso: {
          solicitudes_encoladas: 0,
          tamano_ram: parseInt(formData.ram),
          estado: formData.estado === "enabled" ? true : false,
          ubicacion: formData.ubicacion,
        },
        nombre: formData.nombre,
        numero_nucleos_cpu: parseInt(formData.numNucleos),
        frecuencia_cpu: parseFloat(formData.frecuencia),
      };

      await createCPU(cpuData);
      onSuccess();
      returnToTable();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="dialog-title"
          style={{ color: "rgb(4, 35, 84)" }}
        >
          Agregar CPU
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
        <DialogContent dividers sx={{ p: 2 }}>
          {/* Nombre */}
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.nombre}
            error={formErrors.nombre}
            onChange={handleChange}
          />

          {/* Núcleos */}
          <TextField
            margin="dense"
            id="num-nucleos"
            name="numNucleos"
            label="Número de núcleos"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            value={formData.numNucleos}
            error={formErrors.numNucleos}
            onChange={handleChange}
          />

          {/* Frecuencia */}
          <TextField
            margin="dense"
            id="frecuencia"
            name="frecuencia"
            label="Frecuencia de reloj"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GHz</InputAdornment>,
            }}
            value={formData.frecuencia}
            error={formErrors.frecuencia}
            onChange={handleChange}
          />

          {/* RAM */}
          <TextField
            margin="dense"
            id="ram"
            name="ram"
            label="RAM"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GB</InputAdornment>,
            }}
            value={formData.ram}
            error={formErrors.ram}
            onChange={handleChange}
          />

          {/* Ubicación */}
          <TextField
            margin="dense"
            id="ubicacion"
            name="ubicacion"
            label="Ubicación"
            type="text"
            fullWidth
            value={formData.ubicacion}
            error={formErrors.ubicacion}
            onChange={handleChange}
          />

          {/* Estado */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              id="estado"
              name="estado"
              label="Estado"
              value={formData.estado}
              error={formErrors.estado}
              onChange={handleChange}
            >
              <MenuItem value="enabled">Habilitado</MenuItem>
              <MenuItem value="disabled">Deshabilitado</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end", p: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>

      <DiscardChangesModal
        open={showDiscardModal}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
      ></DiscardChangesModal>
    </div>
  );
}

export default AddCPUModal;

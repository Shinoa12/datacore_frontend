import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

function ModalAgregarCPU({ showModal, toggleModal }) {
  const handleClose = () => {
    toggleModal();
  };

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
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
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            // value={nombre}
            // onChange={manejarCambioNombre}
          />
          <TextField
            margin="dense"
            id="num_nucleos"
            label="Número de núcleos"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            // value={num_nucleos}
            // onChange={manejarCambioNucleos}
          />
          <TextField
            margin="dense"
            id="frecuencia"
            label="Frecuencia de reloj"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GHz</InputAdornment>,
            }}
            // value={frecuencia}
            // onChange={manejarCambioFrecuencia}
          />
          <TextField
            margin="dense"
            id="ram"
            label="RAM"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GB</InputAdornment>,
            }}
            // value={ram}
            // onChange={manejarCambioRam}
          />
          <TextField
            select
            margin="dense"
            id="estado"
            label="Estado"
            defaultValue={""}
            // value={estado}
            // onChange={manejarCambioEstado}
            fullWidth
          >
            <MenuItem value="enabled">Habilitado</MenuItem>
            <MenuItem value="disabled">Deshabilitado</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end", p: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalAgregarCPU;

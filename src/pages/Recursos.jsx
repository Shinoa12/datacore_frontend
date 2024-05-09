import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import MuiDialog from "../components/MuiDialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const columns = [
  { field: "fecha_creacion", headerName: "Fecha de creación", width: 150 },
  { field: "nombre", headerName: "Nombre", width: 260 },
  { field: "estado", headerName: "Estado", width: 120 },
  { field: "num_nucleos", headerName: "# núcleos", width: 120 },
  { field: "frecuencia", headerName: "Frecuencia", width: 120 },
  { field: "ram", headerName: "RAM", width: 120 },
  { field: "fecha_deshab", headerName: "Fecha de deshabilitación", width: 180 },
];

// Registros temporales
const rows = [
  {
    id: 1,
    fecha_creacion: "10/04/2024",
    nombre: "Intel Core i9 14900T",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "5.5 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 2,
    fecha_creacion: "14/04/2024",
    nombre: "Intel Core i9 14900K",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "6.0 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 3,
    fecha_creacion: "16/04/2024",
    nombre: "Intel Core i9-13900KS",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "6.0 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 4,
    fecha_creacion: "20/04/2024",
    nombre: "Intel Core i9 14900",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "5.8 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 5,
    fecha_creacion: "25/04/2024",
    nombre: "Intel Core i9 14900F",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "5.8 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 6,
    fecha_creacion: "28/04/2024",
    nombre: "Intel Core i9 14900HX",
    estado: "Habilitado",
    num_nucleos: "24",
    frecuencia: "5.8 GHz",
    ram: "32 GB",
    fecha_deshab: "No aplica",
  },
  {
    id: 7,
    fecha_creacion: "30/04/2024",
    nombre: "Intel Core i9 14900KF",
    estado: "Deshabilitado",
    num_nucleos: "24",
    frecuencia: "6.0 GHz",
    ram: "32 GB",
    fecha_deshab: "08/05/2024",
  },
];

function Recursos() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mx-4 mt-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Recursos
      </h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          AGREGAR
        </Button>
      </Box>

      <MuiDialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
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
        <DialogContent dividers>
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
            // value={estado}
            // onChange={manejarCambioEstado}
            fullWidth
          >
            <MenuItem value="enabled">Habilitado</MenuItem>
            <MenuItem value="disabled">Deshabilitado</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" onClick={handleClose}>
            CONFIRMAR
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
}

export default Recursos;

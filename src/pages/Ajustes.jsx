import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const textFieldStyles = {
  minWidth: "16rem",
};

function Ajustes() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    // TODO: Guardar cambios

    // Vuelve a animar la alerta si no ha sido cerrada
    if (showAlert) {
      setShowAlert(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 250);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 2 }}>
        <h1 className="font-bold text-3xl">Ajustes</h1>
      </Box>

      <Collapse in={showAlert}>
        <Alert
          severity="success"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Se han guardado los cambios con éxito.
        </Alert>
      </Collapse>
      <Box
        sx={{
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <p className="font-semibold">Recursos máximos por usuario</p>
            <p className="text-sm font-light">
              Cantidad máxima de recursos a disposición del mismo usuario
            </p>
          </Box>
          <TextField
            margin="dense"
            id="recursosMax"
            name="recursosMax"
            type="number"
            inputProps={{ min: 0 }}
            defaultValue={1}
            sx={textFieldStyles}
            // value={}
            // error={}
            // onChange={handleChange}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <p className="font-semibold">Horas de uso máximo</p>
            <p className="text-sm font-light">
              Lapso máximo en horas para el uso de recursos antes de una
              notificación
            </p>
          </Box>
          <TextField
            margin="dense"
            id="tiempoMax"
            name="tiempoMax"
            type="number"
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">horas</InputAdornment>
              ),
            }}
            defaultValue={1}
            sx={textFieldStyles}
            // value={}
            // error={}
            // onChange={handleChange}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <p className="font-semibold">Correo de contacto</p>
            <p className="text-sm font-light">
              Correo al que los usuarios se pueden dirigir para solicitar ayuda
            </p>
          </Box>
          <TextField
            margin="dense"
            id="recursosMax"
            name="recursosMax"
            type="text"
            defaultValue="email@pucp.edu.pe"
            sx={textFieldStyles}
            // value={}
            // error={}
            // onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Ajustes;

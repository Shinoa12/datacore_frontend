import * as React from "react";
import {
  getAllFacultad,
  getAllEspecialidadPorFacultad,
  getAllEstadoPersona,
  updateUser,
} from "../api/Users";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
};

function UpdateUserModal({ open, setOpen, user }) {
  //Hook manejadores de cambios en campos editables del usuario
  const [facultad, setFacultad] = React.useState("");
  const [especialidad, setEspecialidad] = React.useState("");
  const [estadoUsuario, setEstadoUsuario] = React.useState("");

  //Hook manejadores de estado de las lista de los combo box
  const [facultadList, setFacultadList] = React.useState([]);
  const [especialidadList, setEspecialidadList] = React.useState([]);
  const [estadoPersonaList, setEstadoPersonaList] = React.useState([]);

  React.useEffect(() => {
    if (open === true) {
      CargarFacultades();
      CargarEspecialidadesPorFacultad(user.id_facultad);
      CargarEstadosPersonas();

      setFacultad(user.id_facultad || "");
      setEspecialidad(user.id_especialidad || "");
      setEstadoUsuario(user.id_estado_persona || "");
    }
  }, [open]);

  //FUNCIONES PARA ACCEDER A LOS METODOS API
  async function CargarFacultades() {
    const res = await getAllFacultad();
    setFacultadList(res.data);
  }

  async function CargarEstadosPersonas() {
    const res = await getAllEstadoPersona();
    setEstadoPersonaList(res.data);
  }

  async function CargarEspecialidadesPorFacultad(idFacultad) {
    const res = await getAllEspecialidadPorFacultad(idFacultad);
    setEspecialidadList(res.data);
  }

  async function updateUserClick() {
    user.id_facultad = facultad;
    user.id_especialidad = especialidad;
    user.id_estado_persona = estadoUsuario;

    const res = await updateUser(user.id, user);
    console.log(res);
  }

  //VARIABLES QUE MANEJAN LOS CAMBIOS DE LOS INPUTS
  const handleFacultadChange = (event) => {
    CargarEspecialidadesPorFacultad(event.target.value);

    setFacultad(event.target.value);
  };

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  const handleEstadoUsuarioChange = (event) => {
    setEstadoUsuario(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            onClick={() => setOpen(!open)}
            style={{
              position: "absolute",
              top: 32,
              right: 30,
              cursor: "pointer",
            }}
          />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Editar Usuario
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { mb: 1, width: "48ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                value={user.username?.toUpperCase()}
                aria-readonly
              />
              <hr></hr>
              <TextField
                id="outlined-basic"
                label="Nombres"
                variant="outlined"
                value={user.first_name?.toUpperCase()}
                aria-readonly
              />
              <hr></hr>
              <TextField
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                value={user.last_name?.toUpperCase()}
                aria-readonly
              />
              <hr></hr>
              <FormControl required sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Facultad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={facultad}
                  label="Facultad *"
                  onChange={handleFacultadChange}
                >
                  {facultadList.map((facultadItem) => (
                    <MenuItem
                      key={facultadItem.id_facultad}
                      value={facultadItem.id_facultad}
                    >
                      {facultadItem.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <hr></hr>
              <FormControl required sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Especialidad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={especialidad}
                  label="Especialidad *"
                  onChange={handleEspecialidadChange}
                >
                  {especialidadList.map((especialidadItem) => (
                    <MenuItem
                      key={especialidadItem.id_especialidad}
                      value={especialidadItem.id_especialidad}
                    >
                      {especialidadItem.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <hr></hr>
              <TextField
                id="outlined-basic"
                label="Recursos máximos"
                variant="outlined"
                value={user.recursos_max}
                aria-readonly
              />
              <hr></hr>
              <FormControl required sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Estado
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={estadoUsuario}
                  label="Estado *"
                  onChange={handleEstadoUsuarioChange}
                >
                  {estadoPersonaList.map((estadoPersonaItem) => (
                    <MenuItem
                      key={estadoPersonaItem.id_estado_persona}
                      value={estadoPersonaItem.id_estado_persona}
                    >
                      {estadoPersonaItem.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br></br>
              <br></br>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center" // Para centrar horizontalmente
                alignItems="center" // Para centrar verticalmente
              >
                <Button onClick={updateUserClick} variant="contained">
                  Confirmar cambios
                </Button>
              </Stack>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateUserModal;

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import UpdateUserModal from '../components/UpdateUserModal';
import EditIcon from '@mui/icons-material/Edit';
import {getUserById} from '../api/UpdateUserAPI';

function UsuariosAutorizadosMartin() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  

  async function CargarUsuario(idUser){
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  async function openUpdateUserModal(idUser){ //Funcion para abrir el modal
    await CargarUsuario(idUser);
    setOpen(true);
  }

    return (
      <div className="ml-4 mt-4">
        
        {/*El icono se puede iterar de acuerdo a la lista de usuarios colocar el id de usuario en lugar de 1 */}
        <EditIcon onClick={() => openUpdateUserModal(1)} style={{ cursor: 'pointer' }} />
        


        {/*El componente modal se puede usar para todos los iconos, para ello se le debe de setear el user correspondiente*/}
        <UpdateUserModal open = {open} setOpen = {setOpen} user = {user}></UpdateUserModal>
      </div>
    );
  }
  
export default UsuariosAutorizadosMartin;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "correo", headerName: "Correo", width: 200 },
  {
    field: "nombres",
    headerName: "Nombres",
    width: 150,
    editable: true,
  },
  {
    field: "facultad",
    headerName: "Facultad",
    width: 150,
    editable: true,
  },

  {
    field: "age",
    headerName: "Especialidad",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Recursos Máximos",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.facultad || ""} ${row.nombres || ""}`,
  },
];

const rows = [
  {id: 1,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 2,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 3,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 4,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 5,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 6,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 7,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 8,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 9,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 10,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  //
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function UsuariosAutorizados() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="ml-4 mt-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Lista de usuarios autorizados
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

      <div className="flex justify-end">
        {" "}
        {/* Added a new div with justify-end class */}
        <Button variant="contained" onClick={handleClickOpen}>
          NUEVO USUARIO
        </Button>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{ color: "rgb(4, 35, 84)" }}
        >
          Editar Usuario
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Correo:</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={name}
              onChange={(event) =>
                handleSave({ ...name, name: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Nombres:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Apellidos:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Facultad:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Especialidad:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>
              Recursos Máximos:
            </Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleClose}>
            Confirmar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default UsuariosAutorizados;

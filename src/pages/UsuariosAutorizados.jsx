import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUserModal from "../components/UpdateUserModal";
import NoRowsOverlay from "../components/NoRowsOverlay";
import { getAllUsers, getUserById, getAllEstadoPersona } from "../api/Users";

function UsuariosAutorizados() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [selectedState, setSelectedState] = useState(0);
  const [estadoPersonaList, setEstadoPersonaList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function CargarUsuario(idUser) {
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "nombres", headerName: "Nombres", width: 220 },
    { field: "correo", headerName: "Correo", width: 220 },
    { field: "facultad", headerName: "Facultad", width: 180 },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 180,
    },
    {
      field: "recursos_maximos",
      headerName: "Recursos máx.",
      width: 130,
      sortable: false,
    },
    {
      field: "opciones",
      headerName: "Opciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => openEditModal(params.row.id)}>
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    CargarEstadosPersonas();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setData(res.data);
        const filteredData = transformData(res.data); // Filter data initially
        setRows(filteredData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function CargarEstadosPersonas() {
    const res = await getAllEstadoPersona();
    setEstadoPersonaList(res.data);
  }

  const transformData = (originalData) => {
    return originalData
      .filter(
        (user) => user.id_estado_persona === 2 || user.id_estado_persona === 3
      )
      .map((user) => ({
        id: user.id, // Use the original unique ID
        correo: user.email || "", // Get email or use empty string if missing
        nombres: `${user.first_name?.toUpperCase() || ""} ${
          user.last_name?.toUpperCase() || ""
        }`, // Combine and uppercase names (use empty strings if missing)
        facultad: "Ciencias e Ingeniería", // Replace with your logic for faculty
        especialidad: "ingeniería Informática",
        recursos_maximos: 1,
        originalId: user.id, // Keep the original ID for reference
      }));
  };

  function handleStateChange(event) {
    const newState = event.target.value;
    setSelectedState(newState);
    setLoading(true);

    if (newState !== 0) {
      console.log(newState);
      const filteredRows = data.filter(
        (row) => row.id_estado_persona === newState
      ); // Filter based on selected state
      setRows(transformData(filteredRows));
    } else {
      // MUESTRA TODA LA DATA
      console.log(newState);
      setRows(transformData(data));
    }
    setLoading(false);
  }

  const openEditModal = async (id) => {
    await CargarUsuario(id);
    setOpen(true);
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Lista de usuarios autorizados</p>
      </Box>

      {/* Filtro de estado */}
      <Box sx={{ mb: 4 }}>
        <FormControl margin="dense">
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            id="estado"
            name="estado"
            label="Estado"
            value={selectedState}
            onChange={handleStateChange}
            disabled={loading || rows.length === 0}
          >
            <MenuItem key={0} value={0}>
              TODOS
            </MenuItem>
            {estadoPersonaList
              .filter(({ nombre }) => nombre !== "DESAUTORIZADO")
              .map(({ id_estado_persona, nombre }) => (
                <MenuItem key={id_estado_persona} value={id_estado_persona}>
                  {nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {/* Tabla */}
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={loading}
      />

      <UpdateUserModal
        open={open}
        setOpen={setOpen}
        user={user}
      ></UpdateUserModal>
    </div>
  );
}

export default UsuariosAutorizados;

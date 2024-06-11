import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllUsers, getUserById, getAllEstadoPersona } from "../api/Users";
import { MdModeEdit } from "react-icons/md";
import UpdateUserModal from "../components/UpdateUserModal";

function UsuariosAutorizados() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [selectedState, setSelectedState] = React.useState(0);
  const [estadoPersonaList, setEstadoPersonaList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function CargarUsuario(idUser) {
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    { field: "correo", headerName: "Correo", width: 200, editable: false },
    { field: "nombres", headerName: "Nombres", width: 400, editable: false },
    { field: "facultad", headerName: "Facultad", width: 250, editable: false },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 250,
      editable: false,
    },
    {
      field: "recursos_maximos",
      headerName: "Recursos Máximos",
      sortable: false,
      width: 200,
      editable: false,
    },
    {
      field: "options",
      headerName: "Opciones",
      description: "",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          await CargarUsuario(params.row.id);
          setOpen(true);
        };

        return (
          <MdModeEdit
            className="inline-block w-6 h-5 mr-2 -mt-2"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          ></MdModeEdit>
        );
      },
    },
  ];

  React.useEffect(() => {
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

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Lista de usuarios autorizados</p>
      </Box>

      <div className="flex justify-content-center items-center">
        <span style={{ color: "rgb(4, 35, 84)" }} className=" text-lg mr-4">
          Estado:
        </span>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={selectedState}
          label="Estado"
          onChange={handleStateChange}
        >
          <MenuItem key={0} value={0}>
            TODOS
          </MenuItem>
          {estadoPersonaList
            .filter(
              (estadoPersonaItem) =>
                estadoPersonaItem.nombre !== "DESAUTORIZADO"
            )
            .map((estadoPersonaItem) => (
              <MenuItem
                key={estadoPersonaItem.id_estado_persona}
                value={estadoPersonaItem.id_estado_persona}
              >
                {estadoPersonaItem.nombre}
              </MenuItem>
            ))}
        </Select>
      </div>

      <Box sx={{ height: 400, width: "100%" }} className="mt-4">
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
          disableRowSelectionOnClick
          disableSelectionOnClick
        />
      </Box>

      <UpdateUserModal
        open={open}
        setOpen={setOpen}
        user={user}
      ></UpdateUserModal>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default UsuariosAutorizados;

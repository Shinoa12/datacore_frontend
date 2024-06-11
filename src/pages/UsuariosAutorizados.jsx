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
import {
  getAllUsers,
  getAllEstadoPersona,
  getAllFacultad,
  getAllEspecialidades,
} from "../api/Users";

function UsuariosAutorizados() {
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

  const [userList, setUserList] = useState([]);
  const [estadoPersonaList, setEstadoPersonaList] = useState([]);
  const [facultadList, setFacultadList] = useState([]);
  const [especialidadList, setEspecialidadList] = useState([]);
  const [rows, setRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUserList(response.data);
      const filteredData = transformUserList(response.data);
      setRows(filteredData);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEstadoPersonaList = async () => {
    const response = await getAllEstadoPersona();
    setEstadoPersonaList(response.data);
  };

  const fetchFacultadList = async () => {
    const response = await getAllFacultad();
    setFacultadList(response.data);
  };

  const fetchEspecialidadList = async () => {
    const response = await getAllEspecialidades();
    setEspecialidadList(response.data);
  };

  // Mantiene solo los usuarios pendientes y autorizados
  const transformUserList = (list) => {
    if (!dataReady) return [];

    const filteredList = list
      .filter(
        (user) => user.id_estado_persona === 2 || user.id_estado_persona === 3
      )
      .map((user) => {
        const facultadObj = facultadList.find(
          (item) => item.id_facultad == user.id_facultad
        );
        const especialidadObj = especialidadList.find(
          (item) => item.id_especialidad == user.id_especialidad
        );

        return {
          id: user.id,
          correo: user.email,
          nombres: `${user.first_name?.toUpperCase()} ${user.last_name?.toUpperCase()}`,
          facultad: facultadObj ? facultadObj.nombre : "",
          especialidad: especialidadObj ? especialidadObj.nombre : "",
          recursos_maximos: user.recursos_max,
        };
      });

    return filteredList;
  };

  const changeFilter = (status) => {
    setSelectedStatus(status);
    setLoading(true);

    if (status !== 0) {
      const filteredList = userList.filter(
        (user) => user.id_estado_persona === status
      );
      setRows(transformUserList(filteredList));
    } else {
      setRows(transformUserList(userList));
    }

    setLoading(false);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    changeFilter(status);
  };

  const openEditModal = (id) => {
    setSelectedUser(id);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(0);
  };

  const handleEditSuccess = async () => {
    console.log("edit success");
    await fetchUserList();
    setSelectedStatus(0);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        await fetchEstadoPersonaList();
        await fetchFacultadList();
        await fetchEspecialidadList();
        await fetchUserList();
        setDataReady(true);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (dataReady) {
      setRows(transformUserList(userList));
    }
  }, [dataReady, userList, facultadList, especialidadList]);

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
            value={selectedStatus}
            onChange={handleStatusChange}
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
        open={showEditModal}
        onClose={closeEditModal}
        onSuccess={handleEditSuccess}
        id={selectedUser}
      ></UpdateUserModal>
    </div>
  );
}

export default UsuariosAutorizados;

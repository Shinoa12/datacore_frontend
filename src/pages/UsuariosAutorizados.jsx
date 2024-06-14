import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import EditUserModal from "../components/EditUserModal";
import SuccessModal from "../components/SuccessModal";
import NoRowsOverlay from "../components/NoRowsOverlay";
import {
  getUsuariosValidos,
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
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [facultadList, setFacultadList] = useState([]);
  const [especialidadList, setEspecialidadList] = useState([]);
  const [estadoList, setEstadoList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedEstado, setSelectedEstado] = useState(0);
  const [listsFetched, setListsFetched] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Obtiene listas de estados, facultades, especialidades
  const fetchLists = async () => {
    setListsFetched(false);
    setUsersFetched(false);
    try {
      const [estadoResponse, facultadResponse, especialidadResponse] =
        await Promise.all([
          getAllEstadoPersona(),
          getAllFacultad(),
          getAllEspecialidades(),
        ]);

      setEstadoList(estadoResponse.data);
      setFacultadList(facultadResponse.data);
      setEspecialidadList(especialidadResponse.data);

      setListsFetched(true);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };

  // Obtiene usuarios
  const fetchUserList = async () => {
    try {
      const response = await getUsuariosValidos();

      const users = response.data.map((user) => {
        const facultadObj = facultadList.find(
          (item) => item.id_facultad == user.id_facultad
        );
        const especialidadObj = especialidadList.find(
          (item) => item.id_especialidad == user.id_especialidad
        );

        return {
          id: user.id,
          nombres: `${user.first_name?.toUpperCase()} ${user.last_name?.toUpperCase()}`,
          correo: user.email,
          facultad: facultadObj ? facultadObj.nombre : "",
          especialidad: especialidadObj ? especialidadObj.nombre : "",
          recursos_maximos: user.recursos_max,
          estado: user.id_estado_persona,
        };
      });

      setUserList(users);
      setUsersFetched(true);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  // Filtra usuarios dependiendo del estado
  const filterUsers = () => {
    if (selectedEstado === 0) {
      setFilteredUserList(userList);
    } else {
      const filteredUsers = userList.filter(
        (user) => user.estado === Number(selectedEstado)
      );
      setFilteredUserList(filteredUsers);
    }
  };

  // Obtiene listas al renderizar el componente
  useEffect(() => {
    fetchLists();
  }, []);

  // Obtiene usuarios al tener listas con datos
  useEffect(() => {
    if (listsFetched) {
      fetchUserList();
    }
  }, [listsFetched, facultadList, especialidadList]);

  // Llama a la función de filtración cuando cambia el estado o la lista base
  useEffect(() => {
    if (usersFetched) {
      filterUsers();
    }
  }, [usersFetched, selectedEstado, userList]);

  // Handlers y funciones para modals

  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
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
    setShowSuccessModal(true);
    await fetchLists();
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Lista de usuarios autorizados</p>
      </Box>

      {/* Filtro de estado */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: "10rem" }}>
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            id="estado-filter"
            value={selectedEstado}
            onChange={handleEstadoChange}
            disabled={!(listsFetched && usersFetched) || userList.length === 0}
          >
            <MenuItem key={0} value={0}>
              TODOS
            </MenuItem>
            {estadoList
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
        rows={filteredUserList}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={!(listsFetched && usersFetched)}
      />

      <EditUserModal
        open={showEditModal}
        onClose={closeEditModal}
        onSuccess={handleEditSuccess}
        id={selectedUser}
        facultadList={facultadList}
        especialidadList={especialidadList}
        estadoList={estadoList}
      />

      <SuccessModal
        open={showSuccessModal}
        onClose={closeSuccessModal}
        content="El usuario ha sido editado satisfactoriamente."
      />
    </div>
  );
}

export default UsuariosAutorizados;

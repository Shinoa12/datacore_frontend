import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { getAllUsers, getUserById } from "../api/Users";
import { MdModeEdit } from "react-icons/md";
import EditUserModal from "../components/EditUserModal";
import NoRowsOverlay from "../components/NoRowsOverlay";

function UsuariosDesautorizados() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "correo", headerName: "Correo", width: 200 },
    {
      field: "nombres",
      headerName: "Nombres",
      width: 150,
      editable: false,
    },
    {
      field: "facultad",
      headerName: "Facultad",
      width: 150,
      editable: false,
    },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 110,
      editable: false,
    },
    {
      field: "fecha_deshabilitacion",
      headerName: "Fecha Deshabilitación",
      width: 110,
      editable: false,
    },
    {
      field: "motivo",
      headerName: "Motivo",
      width: 110,
      editable: false,
    },
    {
      field: "options",
      headerName: "Opciones",
      description: "",
      sortable: false,
      width: 160,
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

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        transformData(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function CargarUsuario(idUser) {
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  const transformData = (originalData) => {
    const newData = [];
    for (const index in originalData) {
      const user = originalData[index];
      if (user.id_estado_persona == 1) {
        newData.push({
          id: parseInt(index) + 1, // Start IDs from 1 (adjust as needed)
          correo: user.email || "", // Get email or use empty string if missing
          nombres: `${user.first_name?.toUpperCase() || ""} ${
            user.last_name?.toUpperCase() || ""
          }`, // Combine and uppercase names (use empty strings if missing)
          facultad: "Ciencias e Ingeniería", // Replace with your logic for faculty
          especialidad: "ingeniería Informática", // Add specialty if needed
          fecha_deshabilitacion: user.fecha_deshabilitacion || "", // Replace with your logic for date
          motivo: user.motivo || "", // Replace with your logic for reason
        });
      }
    }
    return setRows(newData);
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Lista de usuarios desautorizados</p>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
          loading={loading}
        />
      </Box>

      <EditUserModal open={open} setOpen={setOpen} user={user}></EditUserModal>
    </div>
  );
}

export default UsuariosDesautorizados;

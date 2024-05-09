import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ModalAgregarCPU from "../components/ModalAgregarCPU";

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
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
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
          disableRowSelectionOnClick
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button variant="contained" onClick={toggleModal}>
          AGREGAR
        </Button>
      </Box>

      <ModalAgregarCPU showModal={showModal} toggleModal={toggleModal} />
    </div>
  );
}

export default Recursos;

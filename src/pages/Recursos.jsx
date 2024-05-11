import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ModalAgregarCPU from "../components/ModalAgregarCPU";
import { getAllCPU } from "../api/RecursoDropdown";

const headers = [
  { field: "nombre", headerName: "Nombre", width: 220 },
  { field: "solicitudes", headerName: "# solicitudes", width: 140 },
  { field: "estado", headerName: "Estado", width: 130 },
  { field: "numero_nucleos_cpu", headerName: "# núcleos", width: 120 },
  { field: "frecuencia_cpu", headerName: "Frecuencia", width: 120 },
  { field: "tamano_ram", headerName: "RAM", width: 120 },
  { field: "ubicacion", headerName: "Ubicación", width: 120 },
];

function Recursos() {
  const [showModal, setShowModal] = useState(false);
  const [cpuList, setCpuList] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchData = async () => {
    try {
      const response = await getAllCPU();
      const cpus = response.data.map((item) => ({
        id: item.id_recurso.id_recurso,
        nombre: item.nombre,
        solicitudes: item.id_recurso.solicitudes_encoladas,
        estado: true ? "Habilitado" : "Deshabilitado",
        numero_nucleos_cpu: item.numero_nucleos_cpu,
        frecuencia_cpu: parseFloat(item.frecuencia_cpu).toFixed(2) + " GHz",
        tamano_ram: item.id_recurso.tamano_ram + " GB",
        ubicacion: item.id_recurso.ubicacion,
      }));
      setCpuList(cpus);
    } catch (error) {
      console.error("Error al cargar CPUs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-4 mt-4">
      <h1
        style={{ color: "rgb(4, 35, 84)" }}
        className="font-bold text-3xl mb-4"
      >
        Recursos
      </h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={headers}
          rows={cpuList}
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

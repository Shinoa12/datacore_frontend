import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ModalAgregarCPU from "../components/ModalAgregarCPU";
import ModalAgregarGPU from "../components/ModalAgregarGPU";
import { getAllCPU, getAllGPU } from "../api/RecursoDropdown";

const cpuHeaders = [
  { field: "nombre", headerName: "Nombre", width: 220 },
  { field: "solicitudes", headerName: "# solicitudes", width: 140 },
  { field: "estado", headerName: "Estado", width: 130 },
  { field: "numero_nucleos_cpu", headerName: "# núcleos", width: 120 },
  { field: "frecuencia_cpu", headerName: "Frecuencia", width: 120 },
  { field: "tamano_ram", headerName: "RAM", width: 120 },
  { field: "ubicacion", headerName: "Ubicación", width: 120 },
];

const gpuHeaders = [
  { field: "nombre", headerName: "Nombre", width: 220 },
  { field: "solicitudes", headerName: "# solicitudes", width: 140 },
  { field: "estado", headerName: "Estado", width: 130 },
  { field: "numero_nucleos_gpu", headerName: "# núcleos", width: 120 },
  { field: "frecuencia_gpu", headerName: "Frecuencia", width: 120 },
  { field: "tamano_vram", headerName: "VRAM", width: 120 },
  { field: "ubicacion", headerName: "Ubicación", width: 120 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function Recursos() {
  const [showModalCPU, setShowModalCPU] = useState(false);
  const [showModalGPU, setShowModalGPU] = useState(false);
  const [cpuList, setCpuList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const toggleModal = () => {
    tabValue === 0
      ? setShowModalCPU(!showModalCPU)
      : setShowModalGPU(!showModalGPU);
  };

  useEffect(() => {
    const fetchCPU = async () => {
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

    const fetchGPU = async () => {
      try {
        const response = await getAllGPU();
        const gpus = response.data.map((item) => ({
          id: item.id_recurso.id_recurso,
          nombre: item.nombre,
          solicitudes: item.id_recurso.solicitudes_encoladas,
          estado: true ? "Habilitado" : "Deshabilitado",
          numero_nucleos_gpu: item.numero_nucleos_gpu,
          frecuencia_gpu: parseFloat(item.frecuencia_gpu).toFixed(2) + " GHz",
          tamano_vram: item.tamano_vram + " GB",
          ubicacion: item.id_recurso.ubicacion,
        }));
        setGpuList(gpus);
      } catch (error) {
        console.error("Error al cargar GPUs:", error);
      }
    };

    fetchCPU();
    fetchGPU();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="mx-4 mt-4">
      <h1
        style={{ color: "rgb(4, 35, 84)" }}
        className="font-bold text-3xl mb-4"
      >
        Recursos computacionales
      </h1>
      <Box sx={{ my: 3 }}>
        <Button
          variant="contained"
          onClick={toggleModal}
          startIcon={<AddIcon />}
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="CPU" id="tab-cpu" />
          <Tab label="GPU" id="tab-gpu" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <DataGrid
            columns={cpuHeaders}
            rows={cpuList}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DataGrid
            columns={gpuHeaders}
            rows={gpuList}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </TabPanel>
      </Box>

      <ModalAgregarCPU showModal={showModalCPU} toggleModal={toggleModal} />
      <ModalAgregarGPU showModal={showModalGPU} toggleModal={toggleModal} />
    </div>
  );
}

export default Recursos;

import React, { useState, useEffect } from "react";
import { listCPUs } from "../api/Recursos";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CPUDropdown = ({ value, onChange }) => {
  const [cpuList, setCpuList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listCPUs();
        // Filtrar la lista de CPUs para mostrar solo las que tienen estado=1
        const filteredCPUs = res.data.filter(
          (cpu) => cpu.id_recurso.estado === true
        );
        setCpuList(filteredCPUs);
      } catch (error) {
        console.error("Error al cargar CPUs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FormControl margin="dense" fullWidth>
      <InputLabel id="cpu-dropdown-label">Nombre</InputLabel>
      <Select
        labelId="cpu-dropdown-label"
        id="cpu-dropdown"
        value={value}
        onChange={onChange}
        label="Nombre"
      >
        {cpuList.map((cpuItem) => (
          <MenuItem key={cpuItem.id_recurso.id_recurso} value={cpuItem}>
            {cpuItem.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CPUDropdown;

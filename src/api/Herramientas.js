import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";

const apiGet = (endpoint) => {
    return axios.get(`${API_BASE_URL}${endpoint}`);
  };

export const getAllHerramientas = () => apiGet("herramientas/");

export const getHerramientasPorCPU = (idCPU) => {
    return axios.get(`${API_BASE_URL}cpus/${idCPU}/herramientas/`);
};

export const getHerramientasPorGPU = (idGPU) => {
    return axios.get(`${API_BASE_URL}gpus/${idGPU}/herramientas/`);
};

export const getLibreriasPorHerramienta = (idHerramienta) => {
    return axios.get(`${API_BASE_URL}herramientas/${idHerramienta}/librerias/`);
};

import axios from "axios";

const API_URL  = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1`;
export const getRequestsByMonth = () => axios.get(`${API_URL}/requests_by_month/`);
export const getRequestsByResource = () => axios.get(`${API_URL}/requests_by_resource/`);
export const getRequestsBySpecialty = () => axios.get(`${API_URL}/requests_by_specialty/`);
export const getAverageProcessingDuration = () => axios.get(`${API_URL}/average_processing_duration/`);
export const getSolicitudesCreadas = () => axios.get(`${API_URL}/solicitudes_creadas/`);
export const getSolicitudesEnProceso = () => axios.get(`${API_URL}/solicitudes_en_proceso/`);
export const getSolicitudesFinalizadas = () => axios.get(`${API_URL}/solicitudes_finalizadas/`);
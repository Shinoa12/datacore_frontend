import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";


export const getAllSolicitudes = (idUsuario) => {
    return axios.get(`${API_BASE_URL}${'getAllSolicitudes/'}${idUsuario}`)
}

export const getSolicitudDetalle = (idUsuario) => {
    return axios.get(`${API_BASE_URL}${'getSolicitudDetalle/'}${idSolicitud}`)
}

export const getSolicitudResultado = (idSolicitud) => {
    return axios.get(`${API_BASE_URL}${'getSolicitudResultado/'}${idSolicitud}`)
}

export const deleteSolicitud = (idSolicitud) => {
    return axios.delete(`${API_BASE_URL}${'deleteSolicitud'}${idSolicitud}`)
}
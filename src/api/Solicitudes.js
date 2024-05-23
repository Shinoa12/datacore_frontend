import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";


export const getAllSolicitudes = (idUsuario) => {
    //return axios.get(`${API_BASE_URL}${'getAllSolicitudes/'}${idUsuario}`)
    return axios.get("https://raw.githubusercontent.com/Shinoa12/datacore_frontend/main/public/test_Data/dataSolicitudes.json?token=GHSAT0AAAAAACSCPRMG6YAMFINQVHYQI5P2ZSPVTPQ")
}

export const getSolicitudDetalle = (idUsuario) => {
    //return axios.get(`${API_BASE_URL}${'getSolicitudDetalle/'}${idSolicitud}`)
    return axios.get("https://raw.githubusercontent.com/Shinoa12/datacore_frontend/main/public/test_Data/dataDetalleSolicitde.json?token=GHSAT0AAAAAACSCPRMHAQKCUTVDHNSPSOZAZSPVTIQ")
}

export const getSolicitudResultado = (idSolicitud) => {
    //return axios.get(`${API_BASE_URL}${'getSolicitudResultado/'}${idSolicitud}`)
    return axios.get("https://raw.githubusercontent.com/Shinoa12/datacore_frontend/main/public/test_Data/dataResultado.txt?token=GHSAT0AAAAAACSCPRMGXG2RQCQ2W2S3T5CEZSPVTLQ")
}

export const deleteSolicitud = (idSolicitud) => {
    return axios.delete(`${API_BASE_URL}${'deleteSolicitud'}${idSolicitud}`)
}
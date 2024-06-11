import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";


export const getAllSolicitudes = (idUsuario) => {
    return axios.get(`${API_BASE_URL}${'getAllSolicitudes/'}${idUsuario}`)
    //return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataSolicitudes.json")
}

export const getSolicitudDetalle = (idUsuario) => {
    return axios.get(`${API_BASE_URL}${'getSolicitudDetalle/'}${idSolicitud}`)
    //return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataDetalleSolicitde.json")
}

export const getSolicitudResultado = (idSolicitud) => {
    return axios.get(`${API_BASE_URL}${'getSolicitudResultado/'}${idSolicitud}`)
    //return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataResultado.txt")
}

export const deleteSolicitud = (idSolicitud) => {
    
    return axios.delete(`${API_BASE_URL}${'cancelarSolicitud/'}${idSolicitud}`)
}

export const createSolicitud = (id_usuario, id_recurso, execution_params, archivos) => {
    const formData = new FormData();
    formData.append('id_user', id_usuario);
    formData.append('id_recurso', id_recurso); // Adjust according to your actual CPU data structure
    formData.append('parametros_ejecucion', execution_params);

    archivos.forEach((file, index) => {
        formData.append(`archivos[${index}]`, file);
    });

    console.log(formData)

    return axios.post('http://127.0.0.1:8000/datacore/api/v1/crear-solicitud/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";


export const getAllSolicitudes = () => {
    //return axios.get(`${API_BASE_URL}${'getAllSolicitudes/'}${idUsuario}`)
    return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataSolicitudes.json")
}
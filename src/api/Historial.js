import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;


export const getHistorial = () => {
    return axios.get(`${API_BASE_URL}${'historial'}`)
    //return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataSolicitudes.json")
}
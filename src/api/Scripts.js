import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";

const apiPost = (endpoint, data) => {
  return axios.post(`${API_BASE_URL}${endpoint}`, data);
};

export const runScript = (script) => apiPost("run-script/", script);

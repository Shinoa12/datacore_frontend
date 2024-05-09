import axios from 'axios'

export const getAllCPU = () => {
    return axios.get('http://127.0.0.1:8000/datacore/api/v1/cpus/')
}

export const getAllGPU = () => {
    return axios.get('http://127.0.0.1:8000/datacore/api/v1/gpus/')
}
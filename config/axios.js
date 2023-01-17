import axios from 'axios'
const clienteAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.backendURL
})

export default clienteAxios

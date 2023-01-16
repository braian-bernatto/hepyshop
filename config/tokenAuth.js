import clienteAxios from './axios'

const tokenAuth = token => {
  if (token) {
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // clienteAxios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  } else {
    delete clienteAxios.defaults.headers.common['Authorization']
  }
}

export default tokenAuth

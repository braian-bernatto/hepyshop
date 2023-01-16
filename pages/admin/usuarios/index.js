import React, { useEffect, useState } from 'react'
import Usuario from '../../../components/Usuario'
import clienteAxios from '../../../config/axios'

const index = () => {
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await clienteAxios('/usuarios')
        console.log(datos.data)
        if (datos) {
          setUsuarios(
            datos.data.sort((a, b) =>
              a.usuario_nombre.localeCompare(b.usuario_nombre)
            )
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='bg-white rounded mx-10 flex flex-wrap justify-center p-10 gap-10 items-center'>
      <h1 className='w-full text-center pt-5 text-2xl font-bold text-slate-500'>
        Listado de Usuarios
      </h1>
      <ul className='flex w-full flex-wrap gap-5 justify-center'>
        {usuarios.map(usuario => (
          <li key={usuario.usuario_id}>
            <Usuario datos={usuario} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default index

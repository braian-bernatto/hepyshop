import { useAtom } from 'jotai'
import React, { useState } from 'react'
import clienteAxios from '../config/axios'
import { usuarioAtom } from '../store'
import CustomSuccessMessage from './CustomSuccessMessage'

const Usuario = ({
  datos: { usuario_nombre, usuario_correo, usuario_aprobado, usuario_admin }
}) => {
  const [msg, setMsg] = useState(null)
  const [esAprobado, setEsAprobado] = useState(usuario_aprobado)
  const [usuario, setUsuario] = useAtom(usuarioAtom)
  const aprobarUsuario = async (correo, aprobado) => {
    try {
      const resultado = await clienteAxios.post(`/usuario/aprobar`, {
        correo,
        aprobado
      })
      setEsAprobado(aprobado)
      if (usuario_nombre === usuario.nombre) {
        setUsuario({
          ...usuario,
          aprobado: aprobado
        })
      }
      setMsg(resultado.data)
      setTimeout(() => {
        setMsg(null)
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='border rounded px-5 gap-5 py-1 shadow flex relative text-slate-600'>
      {msg && (
        <div className='absolute left-0 -top-7 z-50 w-full'>
          <CustomSuccessMessage msg={msg} />
        </div>
      )}
      {usuario_admin && (
        <span className='bg-yellow-500 text-white rounded-full px-2 text-xs absolute -left-1 -top-2'>
          Admin
        </span>
      )}
      <div>
        <h1>{usuario_nombre}</h1>
        <h2 className='text-sm text-gray-500'>{usuario_correo}</h2>
      </div>
      <button
        aria-label='Aprobar o Desaprobar usuario'
        onClick={() => aprobarUsuario(usuario_correo, !esAprobado)}
      >
        {esAprobado ? '✅' : '❌'}
      </button>
    </div>
  )
}

export default Usuario

import { useAtom } from 'jotai'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import { filtroProductoAtom, usuarioAtom } from '../store'
import Confirmar from './Confirmar'
import CustomErrorMessage from './CustomErrorMessage'
import CustomSuccessMessage from './CustomSuccessMessage'

const ProductDetails = ({ datos }) => {
  const [showDelete, setShowDelete] = useState(false)
  const [confirmar, setConfirmar] = useState(null)
  const [msg, setMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [usuario] = useAtom(usuarioAtom)
  const [, setFiltroProducto] = useAtom(filtroProductoAtom)
  const handleClick = e =>
    setFiltroProducto({
      nombre: '',
      estado: '',
      categorias: e.target.innerText.toLowerCase()
    })

  useEffect(() => {
    const eliminarProducto = async () => {
      const id = Router.asPath.split('/').pop()
      try {
        const mensaje = await clienteAxios.delete(`/producto/${id}`)
        setMsg(mensaje.data.msg)
        setTimeout(() => {
          Router.push('/')
        }, 1000)
      } catch (error) {
        console.log(error.response.data.msg)
        setErrorMsg(error.response.data.msg)
        setTimeout(() => {
          setErrorMsg('')
        }, 2000)
      }
    }

    if (confirmar) {
      eliminarProducto()
    }
  }, [confirmar])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 px-10 py-5 gap-2 bg-white rounded'>
      {msg && (
        <div className='flex w-full h-full justify-center items-center fixed top-0 left-0 z-50'>
          <span className='absolute w-full h-full bg-gray-500 opacity-70 z-0'></span>
          <CustomSuccessMessage msg={msg} size='text-2xl' />
        </div>
      )}
      {errorMsg && (
        <div className='flex w-full h-full justify-center items-center fixed top-0 left-0 z-50'>
          <span className='absolute w-full h-full bg-gray-500 opacity-70 z-0'></span>
          <CustomErrorMessage msg={errorMsg} />
        </div>
      )}
      {showDelete && (
        <Confirmar
          datos={datos[0].producto_nombre}
          setConfirmar={setConfirmar}
          setShowDelete={setShowDelete}
        />
      )}
      {usuario.auth && (
        <>
          <ul className='overflow-y-auto sm:col-span-2 w-full flex gap-x-5 sm:gap-x-10 gap-y-2 px-3 pb-8 breadcrumb text-slate-600 lowercase'>
            {datos[0].categorias.map(categoria => (
              <li
                key={categoria.categoria_producto_id}
                className='rounded shadow-md px-3 relative cursor-pointer hover:bg-slate-500 hover:text-white transition'
                onClick={e => {
                  handleClick(e)
                  Router.push('/')
                }}
              >
                {categoria.categoria_producto_descri}
              </li>
            ))}
          </ul>
          <section>
            <ul className='flex flex-col flex-wrap items-center gap-5'>
              {datos[0].imagenes.map((imagen, index) => (
                <li key={index}>
                  <Image
                    width={500}
                    height={500}
                    alt={`imagen ${index} del producto ID: ${imagen.producto_id}`}
                    src={`${process.env.backendURL}/${imagen.imagen_url.replace(
                      'public/',
                      ''
                    )}`}
                    className='shadow-md rounded'
                  />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <section className='self-start flex flex-wrap justify-start gap-5 sticky top-24'>
        <h1 className='text-slate-500 text-center md:text-2xl border rounded-md bg-slate-100 p-2 font-semibold w-full shadow-md'>
          {datos[0].producto_nombre}
        </h1>
        <h2 className='shadow-md font-bold p-2 rounded text-yellow-500 border-2 self-start'>
          {datos[0].estado_producto_descri}
        </h2>
        <h2 className='shadow-md font-bold p-2 rounded text-yellow-500 border-2 self-start'>
          {datos[0].producto_cantidad} {datos[0].unidad_medida_descri}
        </h2>
        {(usuario.aprobado || usuario.isAdmin) && (
          <div className='flex gap-5 w-full justify-center pb-5 border-t pt-5'>
            <button
              className='rounded-full border shadow-md px-3 relative cursor-pointer hover:bg-slate-500 hover:text-white transition'
              onClick={() => Router.push(`${Router.asPath}/modificar`)}
            >
              Modificar
            </button>
            <button
              className='rounded-full border shadow-md px-3 relative cursor-pointer bg-red-800 opacity-50 text-white hover:scale-105 hover:opacity-100 transition'
              onClick={() => setShowDelete(true)}
            >
              Eliminar
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProductDetails

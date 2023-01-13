import { useAtom } from 'jotai'
import Image from 'next/image'
import Router from 'next/router'
import React from 'react'
import { filtroProductoAtom, usuarioAtom } from '../store'

const ProductDetails = ({ datos }) => {
  const [usuario] = useAtom(usuarioAtom)
  const [, setFiltroProducto] = useAtom(filtroProductoAtom)
  const handleClick = e =>
    setFiltroProducto({
      nombre: '',
      estado: '',
      categorias: e.target.innerText.toLowerCase()
    })

  return (
    <div className='w-full flex flex-wrap px-10 py-5 gap-2 bg-white rounded'>
      {usuario.auth && (
        <>
          <ul className='w-full flex gap-10 px-3 pb-8 breadcrumb text-slate-600 lowercase'>
            {datos[0].categorias.map(categoria => (
              <li
                key={categoria.categoria_producto_id}
                className='rounded shadow-md px-3 relative cursor-pointer'
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
            <ul className='flex flex-col flex-wrap gap-5'>
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
      <section className='self-start h-full flex flex-wrap justify-start items-start gap-10 sticky top-24'>
        <h1 className='text-slate-500 text-center text-2xl border rounded-md bg-slate-100 p-2 font-semibold w-full shadow-md'>
          {datos[0].producto_nombre}
        </h1>
        <h2 className='shadow-md font-bold p-2 rounded text-yellow-500 border-2 self-start'>
          {datos[0].estado_producto_descri}
        </h2>
        <h2 className='shadow-md font-bold p-2 rounded text-yellow-500 border-2 self-start'>
          {datos[0].producto_cantidad} {datos[0].unidad_medida_descri}
        </h2>
      </section>
    </div>
  )
}

export default ProductDetails

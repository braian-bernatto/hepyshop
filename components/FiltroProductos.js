import { useAtom } from 'jotai'
import React from 'react'
import {
  categoriasProductoAtom,
  estadosProductoAtom,
  filtroProductoAtom
} from '../store'

const FiltroProductos = () => {
  const [estados] = useAtom(estadosProductoAtom)
  const [categorias] = useAtom(categoriasProductoAtom)

  const [filtroProducto, setFiltroProducto] = useAtom(filtroProductoAtom)
  const handleChange = e =>
    setFiltroProducto({
      ...filtroProducto,
      [e.target.name]: e.target.value
    })

  return (
    <div className='md:sticky h-full top-24 shadow flex md:flex-col flex-wrap gap-6 md:gap-10 items-center px-5 py-7 md:py-20 text-slate-600 ml-2'>
      <div className='flex shadow rounded text-center relative'>
        <label
          htmlFor='nombre'
          className='absolute -top-4 md:-top-6 left-1 bg-slate-400 rounded-t px-3 text-white'
        >
          Nombre
        </label>
        <input
          name='nombre'
          type='text'
          className='z-10 w-36 md:w-auto px-3 shadow rounded'
          onChange={handleChange}
          value={filtroProducto.nombre}
        />
      </div>
      <div className='flex shadow rounded text-center relative'>
        <label
          htmlFor='estado'
          className='absolute -top-4 md:-top-6 left-1 bg-slate-400 rounded-t px-3 text-white'
        >
          Estado
        </label>
        <select
          name='estado'
          id='estado'
          className='z-10 w-36 md:w-auto px-3 rounded shadow lowercase'
          onChange={handleChange}
          value={filtroProducto.estado}
        >
          <option value=''>---Eligue una opción---</option>
          {estados.map(estado => (
            <option
              key={estado.estado_producto_id}
              value={estado.estado_producto_descri.toLowerCase()}
            >
              {estado.estado_producto_descri}
            </option>
          ))}
        </select>
      </div>
      <div className='flex shadow rounded text-center relative'>
        <label
          htmlFor='categorias'
          className='absolute -top-4 md:-top-6 left-1 bg-slate-400 rounded-t px-3 text-white'
        >
          Categorías
        </label>
        <select
          name='categorias'
          id='categorias'
          className='z-10 w-36 md:w-auto px-3 rounded shadow lowercase'
          onChange={handleChange}
          value={filtroProducto.categorias}
        >
          <option value=''>---Eligue una opción---</option>
          {categorias.map(categoria => (
            <option
              key={categoria.categoria_producto_id}
              value={categoria.categoria_producto_descri.toLowerCase()}
            >
              {categoria.categoria_producto_descri}
            </option>
          ))}
        </select>
      </div>
      <button
        className='rounded-full shadow-md px-5 border font-semibold transition hover:scale-105 hover:bg-slate-400 hover:text-white'
        onClick={() =>
          setFiltroProducto({
            nombre: '',
            estado: '',
            categorias: ''
          })
        }
      >
        Limpiar opciones
      </button>
    </div>
  )
}

export default FiltroProductos

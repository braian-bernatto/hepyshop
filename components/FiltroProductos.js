import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
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
    <div className='sticky h-full top-24 shadow flex flex-col flex-wrap gap-10 items-center px-5 py-20 text-slate-600'>
      <div className='flex shadow rounded text-center relative'>
        <label
          htmlFor='nombre'
          className='absolute -top-6 pb-1 left-0 bg-slate-300 rounded px-3'
        >
          Nombre
        </label>
        <input
          name='nombre'
          type='text'
          className='z-10 px-3 shadow rounded'
          onChange={handleChange}
          value={filtroProducto.nombre}
        />
      </div>
      <div className='flex shadow rounded text-center relative'>
        <label
          htmlFor='estado'
          className='absolute -top-6 pb-1 left-0 bg-slate-300 rounded px-3'
        >
          Estado
        </label>
        <select
          name='estado'
          id='estado'
          className='z-10 px-3 rounded shadow lowercase'
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
          className='absolute -top-6 pb-1 left-0 bg-slate-300 rounded px-3'
        >
          Categorías
        </label>
        <select
          name='categorias'
          id='categorias'
          className='z-10 px-3 rounded shadow lowercase'
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
    </div>
  )
}

export default FiltroProductos

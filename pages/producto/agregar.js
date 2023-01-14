import React from 'react'
import AgregarProducto from '../../components/AgregarProducto'

const agregar = () => {
  return (
    <div className='bg-white mx-10 rounded p-10 flex flex-col gap-5'>
      <h1 className='w-full text-center text-slate-500 font-semibold text-lg'>
        Agregar Nuevo producto
      </h1>
      <AgregarProducto />
    </div>
  )
}

export default agregar

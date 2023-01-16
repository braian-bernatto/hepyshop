import React from 'react'
import ModificarProducto from '../../../components/ModificarProducto'

const modificar = () => {
  return (
    <div className='bg-white mx-10 rounded p-10 flex flex-col gap-5'>
      <h1 className='w-full text-center text-slate-500 font-semibold text-lg'>
        Modificar
      </h1>
      <ModificarProducto />
    </div>
  )
}

export default modificar

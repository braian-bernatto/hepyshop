import React from 'react'
import Registro from '../../components/Registro'

const index = () => {
  return (
    <div className='bg-white rounded mx-10 flex flex-col justify-center p-10 gap-10 items-center'>
      <h1 className='w-full text-center pt-5 text-2xl font-bold text-slate-500'>
        Registrate para ver mas detalles de tus productos favoritos!
      </h1>
      <Registro />
    </div>
  )
}

export default index

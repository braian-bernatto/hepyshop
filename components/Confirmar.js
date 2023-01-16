import React from 'react'

const Confirmar = ({ datos, setConfirmar, setShowDelete }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <span className='absolute w-full h-full bg-gray-500 opacity-50 z-0'></span>
      <div className='bg-white rounded z-10 p-5 flex flex-col gap-10 w-96 text-center shadow-md'>
        <h1 className='text-slate-600 border-b'>
          Confirmas que quieres eliminar <strong>{datos}</strong>?
        </h1>
        <div className='flex w-full justify-around text-white'>
          <button
            className='px-3 py-1 hover:scale-105 transition rounded-full shadow bg-slate-500'
            onClick={() => {
              setConfirmar(true)
              setShowDelete(false)
            }}
          >
            Confirmar
          </button>
          <button
            className='px-3 py-1 hover:scale-105 transition rounded-full shadow bg-pink-800 opacity-50 hover:opacity-100'
            onClick={() => {
              setConfirmar(false)
              setShowDelete(false)
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmar

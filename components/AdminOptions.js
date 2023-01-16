import Link from 'next/link'
import React from 'react'

const AdminOptions = () => {
  return (
<<<<<<< HEAD
    <div className='flex gap-3'>
=======
    <>
>>>>>>> cbd18835d120d0bc7b20c678f9497403a8008780
      <Link href={'/admin/usuarios'}>
        <button className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-slate-600 hover:scale-105 transition-transform'>
          Aprobar Usuarios
        </button>
      </Link>
<<<<<<< HEAD
      <Link href={'/producto/agregar'}>
        <button className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-slate-600 hover:scale-105 transition-transform'>
          Agregar Producto
        </button>
      </Link>
    </div>
=======
    </>
>>>>>>> cbd18835d120d0bc7b20c678f9497403a8008780
  )
}

export default AdminOptions

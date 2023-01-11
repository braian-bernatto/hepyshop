import Link from 'next/link'
import React from 'react'

const AdminOptions = () => {
  return (
    <div>
      <Link href={'/admin/usuarios'}>
        <button className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-slate-600 hover:scale-105 transition-transform'>
          Aprobar Usuarios
        </button>
      </Link>
    </div>
  )
}

export default AdminOptions

import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usuarioAtom } from '../store'
import AdminOptions from './AdminOptions'
import Login from './Login'

const Header = () => {
  const [usuario] = useAtom(usuarioAtom)
  return (
    <section className='w-full border-2 shadow-md rounded-md flex items-center justify-between p-3 sticky top-0 z-50 bg-white'>
      <Link href={'/'}>
        <Image
          src={'/next.svg'}
          width={20}
          height={20}
          className='w-20 h-14'
          alt='hepyshop logo'
        />
      </Link>
      <div className='flex gap-3'>
        {usuario.isAdmin && <AdminOptions />}
        {(usuario.aprobado || usuario.isAdmin) && (
          <Link href={'/producto/agregar'}>
            <button className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-slate-600 hover:scale-105 transition-transform'>
              Agregar Producto
            </button>
          </Link>
        )}
      </div>
      <Login />
    </section>
  )
}

export default Header

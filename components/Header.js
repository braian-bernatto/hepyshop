import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { usuarioAtom } from '../store'
import AdminOptions from './AdminOptions'
import Login from './Login'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [usuario] = useAtom(usuarioAtom)
  return (
    <section className='w-full shadow-md rounded-b flex flex-wrap items-center justify-between p-3 sticky top-0 z-50 bg-white'>
      <Link href={'/'}>
        <Image
          src={'/next.svg'}
          width={20}
          height={20}
          className='w-20 md:h-14'
          alt='hepyshop logo'
        />
      </Link>
      <div
        className={`justify-center items-center gap-3 w-full md:w-auto ${
          usuario.auth && 'p-5'
        } md:p-0 ${
          menuOpen ? ' flex ' : 'hidden overflow-hidden'
        } md:flex overflow-visible`}
      >
        {usuario.isAdmin && <AdminOptions />}
        {(usuario.aprobado || usuario.isAdmin) && (
          <Link href={'/producto/agregar'}>
            <button className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-slate-600 hover:scale-105 transition-transform'>
              Agregar Producto
            </button>
          </Link>
        )}
      </div>

      <div
        className={`md:flex md:overflow-visible ${
          menuOpen
            ? 'w-full flex '
            : 'hidden overflow-hidden md:overflow-visible'
        }`}
      >
        <Login />
      </div>
      <button
        className='md:hidden absolute right-2 top-1 rounded bg-white shadow-md border w-8 h-8 flex justify-center items-center'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        )}
      </button>
    </section>
  )
}

export default Header

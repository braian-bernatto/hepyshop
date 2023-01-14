import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usuarioAtom } from '../store'

const Product = ({ data }) => {
  const [usuario] = useAtom(usuarioAtom)
  return (
    <Link href={`/producto/${data.producto_id}`}>
      <article className='border-2 shadow-md h-full w-60 flex flex-col items-center gap-5 p-5 rounded-md relative hover:scale-105 hover:shadow-lg transition bg-white'>
        <h1 className='border-b w-full text-slate-500 text-center px-3 font-semibold'>
          {data.producto_nombre}
        </h1>
        {usuario.auth && data.imagenes.length > 0 && (
          <Image
            width={500}
            height={500}
            alt={`imagen del producto ID: ${data.producto_id}`}
            src={`${
              process.env.backendURL
            }/${data.imagenes[0].imagen_url.replace('public/', '')}`}
          />
        )}
        <h2 className='bg-yellow-600 opacity-90 text-white font-bold px-4 rounded absolute -top-2 -right-2'>
          {data.estado_producto_descri}
        </h2>
      </article>
    </Link>
  )
}

export default Product

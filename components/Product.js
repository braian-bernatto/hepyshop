import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({ item }) => {
  return (
    <Link href={`/producto/${item}`}>
      <article className='border-2 shadow-md h-full w-60 flex flex-col items-center gap-5 p-5 rounded-md relative hover:scale-105 hover:shadow-lg transition bg-white'>
        <h1 className='border-b w-full text-slate-500 text-center px-3 font-semibold'>
          Iphone 13 pro max
        </h1>
        <Image width={500} height={500} src={`/images/1 (${item}).jpg`} />
        <h2 className='bg-yellow-600 opacity-90 text-white font-bold px-4 rounded absolute -top-2 -right-2'>
          Nuevo en caja
        </h2>
      </article>
    </Link>
  )
}

export default Product

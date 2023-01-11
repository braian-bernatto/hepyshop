import Image from 'next/image'
import React from 'react'

const ProductDetails = () => {
  return (
    <div className='w-full flex p-10 gap-2 bg-white rounded'>
      <section className='flex flex-col flex-wrap gap-5'>
        <Image
          width={500}
          height={500}
          src={`/images/1 (4).jpg`}
          className='shadow-md rounded'
        />
        <Image
          width={500}
          height={500}
          src={`/images/1 (5).jpg`}
          className='shadow-md rounded'
        />
        <Image
          width={500}
          height={500}
          src={`/images/1 (6).jpg`}
          className='shadow-md rounded'
        />
      </section>
      <section className='self-start h-full flex flex-wrap justify-start items-start gap-10 sticky top-24'>
        <h1 className='text-slate-500 text-center text-2xl border rounded-md bg-slate-100 p-2 font-semibold w-full shadow-md'>
          Iphone 13 pro max
        </h1>
        <h2 className='shadow-md font-bold p-2 rounded text-yellow-500 border-2 self-start'>
          Nuevo en caja
        </h2>
        <h2 className='shadow-md font-bold rounded border-2 p-2 text-yellow-500 text-center'>
          150 Unidades
        </h2>
      </section>
    </div>
  )
}

export default ProductDetails

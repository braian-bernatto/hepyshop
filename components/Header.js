import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Login from './Login'

const Header = () => {
  return (
    <section className='w-full border-2 shadow-md rounded-md flex justify-between p-3 sticky top-0 z-50 bg-white'>
      <Link href={'/'}>
        <Image
          src={'next.svg'}
          width={20}
          height={20}
          className='w-20 h-14'
          alt='hepyshop logo'
        />
      </Link>
      <Login />
    </section>
  )
}

export default Header

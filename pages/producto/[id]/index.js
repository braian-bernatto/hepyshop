import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import ProductDetails from '../../../components/ProductDetails'
import clienteAxios from '../../../config/axios'
import { productoActualAtom } from '../../../store'

export const getServerSidePaths = async () => {
  const enlaces = await clienteAxios.get('/productos/enlaces')
  return {
    paths: enlaces.data.map(enlace => ({
      params: { id: enlace.producto_id.toString() }
    })),
    fallback: false
  }
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params
  const res = await clienteAxios.get(`/producto/${id}`)
  return {
    props: {
      datos: res.data
    }
  }
}

export default function ({ datos }) {
  const [, setProducto] = useAtom(productoActualAtom)
  useEffect(() => {
    setProducto(datos[0])
  }, [])

  return (
    <div className='px-10 mb-10'>
      <ProductDetails datos={datos} />
    </div>
  )
}

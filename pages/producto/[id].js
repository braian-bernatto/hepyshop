import React, { useEffect, useState } from 'react'
import ProductDetails from '../../components/ProductDetails'
import clienteAxios from '../../config/axios'

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
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(productos)
  }, [])

  return (
    <div className='px-10 mb-10'>
      <ProductDetails datos={datos} />
    </div>
  )
}

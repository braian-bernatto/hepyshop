import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import ModificarProducto from '../../../components/ModificarProducto'
import clienteAxios from '../../../config/axios'
import {
  categoriasProductoAtom,
  estadosProductoAtom,
  productoActualAtom,
  unidadesMedidaAtom
} from '../../../store'

const getEstados = async () => {
  try {
    const estados = await clienteAxios(
      `${process.env.backendURL}/estados-producto`
    )
    return estados.data
  } catch (error) {
    console.log(error)
  }
}

const getCategorias = async () => {
  try {
    const categorias = await clienteAxios(
      `${process.env.backendURL}/categorias-producto`
    )
    return categorias.data
  } catch (error) {
    console.log(error)
  }
}

const getUnidadesMedida = async () => {
  try {
    const unidades = await clienteAxios(
      `${process.env.backendURL}/unidades-medida`
    )
    return unidades.data
  } catch (error) {
    console.log(error)
  }
}

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
      datos: res.data,
      estados: await getEstados(),
      categorias: await getCategorias(),
      unidades: await getUnidadesMedida()
    }
  }
}

const modificar = ({ datos, estados, categorias, unidades }) => {
  const [, setEstados] = useAtom(estadosProductoAtom)
  const [, setCategorias] = useAtom(categoriasProductoAtom)
  const [, setUnidades] = useAtom(unidadesMedidaAtom)
  useEffect(() => {
    setEstados(estados)
    setCategorias(categorias)
    setUnidades(unidades)
  }, [])
  return (
    <div className='bg-white md:mx-10 rounded p-10 flex flex-col gap-5'>
      <h1 className='w-full text-center text-slate-500 font-semibold text-lg'>
        Modificar
      </h1>
      <ModificarProducto producto={datos[0]} />
    </div>
  )
}

export default modificar

import { useAtom } from 'jotai'
import { useEffect } from 'react'
import FiltroProductos from '../components/FiltroProductos'
import Product from '../components/Product'
import {
  categoriasProductoAtom,
  estadosProductoAtom,
  productosAtom,
  productosFiltradosAtom,
  unidadesMedidaAtom
} from '../store'
import clienteAxios from '../config/axios'

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

const getProductos = async () => {
  try {
    const productos = await clienteAxios(`${process.env.backendURL}/productos`)
    return productos.data
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

export async function getServerSideProps() {
  return {
    props: {
      estados: await getEstados(),
      categorias: await getCategorias(),
      unidades: await getUnidadesMedida(),
      productosServer: await getProductos()
    }
  }
}

export default function Home({
  estados,
  categorias,
  unidades,
  productosServer
}) {
  const [, setEstados] = useAtom(estadosProductoAtom)
  const [, setCategorias] = useAtom(categoriasProductoAtom)
  const [, setUnidades] = useAtom(unidadesMedidaAtom)
  const [productos, setProductos] = useAtom(productosAtom)
  const [productosFiltrados] = useAtom(productosFiltradosAtom)

  useEffect(() => {
    setEstados(estados)
    setCategorias(categorias)
    setUnidades(unidades)
    setProductos(productosServer)
  }, [])

  return (
    <div className='bg-white rounded mx-10'>
      <h1 className='w-full text-center pt-5 text-2xl font-bold text-slate-500'>
        Ejogua la reipotava, para eso trabajas...
      </h1>
      <div className='flex mb-10'>
        <FiltroProductos />
        <div className='flex flex-wrap gap-10 justify-center p-10'>
          {productosFiltrados.map(producto => (
            <Product key={producto.producto_id} data={producto} />
          ))}
        </div>
      </div>
    </div>
  )
}

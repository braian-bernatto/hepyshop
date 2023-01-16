import { atom } from 'jotai'

export const usuarioAtom = atom({
  auth: false,
  nombre: '',
  aprobado: false,
  isAdmin: false
})

export const clearUsuarioAtom = atom(
  get => get(usuarioAtom),
  (get, set, newValue) => {
    set(usuarioAtom, {
      auth: false,
      nombre: '',
      aprobado: false,
      isAdmin: false
    })
  }
)

export const filtroProductoAtom = atom({
  nombre: '',
  estado: '',
  categorias: ''
})

export const productosFiltradosAtom = atom(get => {
  let productos = get(productosAtom)

  if (get(filtroProductoAtom).nombre != '') {
    productos = productos.filter(product =>
      product.producto_nombre
        .toLowerCase()
        .includes(get(filtroProductoAtom).nombre.toLowerCase())
    )
  }

  if (get(filtroProductoAtom).estado != '') {
    productos = productos.filter(
      product =>
        product.estado_producto_descri.toLowerCase() ==
        get(filtroProductoAtom).estado.toLowerCase()
    )
  }

  if (get(filtroProductoAtom).categorias != '') {
    productos = productos.filter(producto =>
      producto.categorias.find(
        categoria =>
          categoria.categoria_producto_descri.toLowerCase() ==
          get(filtroProductoAtom).categorias.toLowerCase()
      )
    )
  }

  return productos
})

export const estadosProductoAtom = atom([])
export const unidadesMedidaAtom = atom([])
export const categoriasProductoAtom = atom([])
export const productosAtom = atom([])
export const productoActualAtom = atom([])

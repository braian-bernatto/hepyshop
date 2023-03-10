import React, { useState } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import clienteAxios from '../config/axios'
import CustomErrorMessage from './CustomErrorMessage'
import Router from 'next/router'
import { useAtom } from 'jotai'
import {
  categoriasProductoAtom,
  estadosProductoAtom,
  unidadesMedidaAtom
} from '../store'
import PreviewImage from './PreviewImage'
import PreviewServerImage from './PreviewServerImage'
import CustomSuccessMessage from './CustomSuccessMessage'

const ModificarProducto = ({ producto }) => {
  // const [producto] = useAtom(productoActualAtom)
  const [estados] = useAtom(estadosProductoAtom)
  const [unidades] = useAtom(unidadesMedidaAtom)
  const [categoriasAtom] = useAtom(categoriasProductoAtom)
  const [errorMsg, setErrorMsg] = useState(null)
  const [eliminarFotos, setEliminarFotos] = useState([])
  const [msg, setMsg] = useState('')

  const validFileExtensions = ['jpg', 'png', 'jpeg', 'svg', 'webp']

  function getAllowedExt() {
    return validFileExtensions.map(e => `.${e}`).toString()
  }

  function isValidType(fileName) {
    return (
      fileName && validFileExtensions.indexOf(fileName.split('.').pop()) > -1
    )
  }

  Yup.addMethod(Yup.array, 'unique', function (message, mapper = a => a) {
    return this.test('unique', message, function (list) {
      return list.length === new Set(list.map(mapper)).size
    })
  })

  const validationSchema = Yup.object().shape({
    producto_nombre: Yup.string(
      'El nombre debe ser una cadena de texto'
    ).required('El nombre es obligatorio'),
    estado_producto_id: Yup.number().required('El estado es obligatorio'),
    producto_cantidad: Yup.number()
      .required('La cantidad es obligatoria')
      .typeError('Debe ingresar números'),
    unidad_medida_id: Yup.number().required(
      'La unidad de medida es obligatoria'
    ),
    categorias: Yup.array()
      .of(Yup.number())
      .unique('Categoría ya existe')
      .min(1, 'Debes elegir al menos una categoría'),
    foto: Yup.mixed()
      .nullable()
      .test('is-valid-type', 'El tipo de imagen no es la correcta', value => {
        if (!value) return true
        const name = (value.length && value[0].name) || ''
        if (name == '') return true
        return isValidType(name.toLowerCase())
      })
      .test('max-images', 'Cantidad máxima de imágenes 3', value => {
        if (!value) return true
        return (
          value &&
          value.length + producto.imagenes.length - eliminarFotos.length < 4
        )
      })
  })

  const handleSubmit = async values => {
    let formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    //agregar fotos nuevas
    if (values.foto.length) {
      values.foto.forEach((photo, index) => {
        formData.append(`foto`, values.foto[index])
      })
    }

    //listado de fotos a eliminar de la bd
    if (eliminarFotos.length) {
      eliminarFotos.forEach(foto => {
        formData.append(`eliminar_foto`, foto)
      })
    }

    delete formData.foto
    try {
      const respuesta = await clienteAxios.put(
        Router.asPath.replace('/modificar', ''),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      if (respuesta) {
        setMsg(respuesta.data.msg)
        setTimeout(() => {
          Router.push(Router.asPath.replace('/modificar', ''))
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      setErrorMsg(error.response.data.msg)
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000)
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      {msg && (
        <div className='flex w-full h-full justify-center items-center fixed top-0 left-0 z-50'>
          <span className='absolute w-full h-full bg-gray-500 opacity-70 z-0'></span>
          <CustomSuccessMessage msg={msg} size='text-2xl' />
        </div>
      )}
      {errorMsg && (
        <div className='flex w-full h-full justify-center items-center fixed top-0 left-0 z-50'>
          <span className='absolute w-full h-full bg-gray-500 opacity-70 z-0'></span>
          <CustomErrorMessage msg={errorMsg} />
        </div>
      )}
      <Formik
        initialValues={{
          producto_nombre: producto.producto_nombre,
          estado_producto_id: producto.estado_producto_id,
          producto_cantidad: producto.producto_cantidad,
          unidad_medida_id: producto.unidad_medida_id,
          categorias: producto.categorias.map(
            categoria => categoria.categoria_producto_id
          ),
          foto: ''
        }}
        onSubmit={async values => await handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className='flex flex-col flex-wrap gap-7 items-center justify-center w-full py-5'>
            <div className='relative w-full flex flex-col items-center gap-5'>
              <input
                multiple
                type='file'
                name='foto'
                accept={getAllowedExt()}
                className='border shadow rounded p-1 px-2 w-60 text-center text-slate-500'
                onChange={event => {
                  setFieldValue('foto', Array.from(event.currentTarget.files))
                }}
              />
              <ul className='flex flex-wrap justify-center gap-5 w-full text-slate-500 border-b pb-5'>
                {values.foto &&
                  values.foto.map((image, index) => (
                    <li
                      key={index}
                      className='relative flex justify-center cursor-pointer'
                    >
                      <PreviewImage file={image} />
                    </li>
                  ))}
              </ul>
              <section>
                <ul className='flex flex-wrap justify-center gap-5 w-full text-slate-500'>
                  {producto &&
                    producto.imagenes.map((imagen, index) => (
                      <li
                        key={index}
                        className='relative flex cursor-pointer'
                        onClick={() => {
                          eliminarFotos.includes(imagen.imagen_url)
                            ? setEliminarFotos([
                                ...eliminarFotos.filter(
                                  foto => foto != imagen.imagen_url
                                )
                              ])
                            : setEliminarFotos([
                                ...eliminarFotos,
                                imagen.imagen_url
                              ])
                        }}
                      >
                        {eliminarFotos.includes(imagen.imagen_url) && (
                          <span className='bg-gray-500 opacity-50 h-full rounded w-full absolute flex flex-wrap justify-center items-center text-5xl'>
                            ❌
                          </span>
                        )}
                        <PreviewServerImage
                          file={`${
                            process.env.backendURL
                          }/${imagen.imagen_url.replace('public/', '')}`}
                          setEliminarFotos={setEliminarFotos}
                        />
                      </li>
                    ))}
                </ul>
              </section>

              <ErrorMessage
                name='foto'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <div className='relative'>
              <Field
                type='text'
                name='producto_nombre'
                placeholder='Nombre del producto'
                className='border shadow rounded p-1 px-2 w-60 text-center'
              />
              <ErrorMessage
                name='producto_nombre'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <div className='relative'>
              <Field
                as='select'
                name='estado_producto_id'
                className='border shadow rounded p-1 px-2 w-60 text-center lowercase'
              >
                <option value=''>--seleccione un estado--</option>
                {estados.map(estado => (
                  <option
                    key={estado.estado_producto_id}
                    value={estado.estado_producto_id}
                  >
                    {estado.estado_producto_descri}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name='estado_producto_id'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <div className='relative'>
              <Field
                type='number'
                name='producto_cantidad'
                placeholder='Cantidad'
                className='border shadow rounded p-1 px-2 w-60 text-center'
                min={0}
              />
              <ErrorMessage
                name='producto_cantidad'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <div className='relative'>
              <Field
                as='select'
                name='unidad_medida_id'
                className='border shadow rounded p-1 px-2 w-60 text-center lowercase'
              >
                <option value=''>--seleccione una unidad--</option>
                {unidades.map(unidad => (
                  <option
                    key={unidad.unidad_medida_id}
                    value={unidad.unidad_medida_id}
                  >
                    {unidad.unidad_medida_descri}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name='unidad_medida_id'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <div className='relative'>
              <FieldArray
                name='categorias'
                render={arrayHelpers => (
                  <div className='flex text-center flex-wrap gap-5 lowercase shadow rounded-lg p-5 justify-center'>
                    {categoriasAtom.map(categoria => (
                      <label
                        key={categoria.categoria_producto_id}
                        className='rounded-full border px-3 shadow cursor-pointer select-none'
                      >
                        <input
                          className='hidden'
                          name='categorias'
                          type='checkbox'
                          value={categoria.categoria_producto_id}
                          checked={values.categorias.includes(
                            categoria.categoria_producto_id
                          )}
                          onChange={e => {
                            if (e.target.checked) {
                              arrayHelpers.push(categoria.categoria_producto_id)
                            } else {
                              const idx = values.categorias.indexOf(
                                categoria.categoria_producto_id
                              )
                              arrayHelpers.remove(idx)
                            }
                          }}
                        />{' '}
                        <span>{categoria.categoria_producto_descri}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              <ErrorMessage
                name='categorias'
                render={msg => (
                  <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                    {msg}
                  </p>
                )}
              />
            </div>
            <button
              type='submit'
              className='rounded-full bg-slate-500 text-white px-14 py-2 shadow-md hover:bg-slate-400 hover:scale-105 transition-transform'
            >
              Modificar Producto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ModificarProducto

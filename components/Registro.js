import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import clienteAxios from '../config/axios'
import CustomErrorMessage from './CustomErrorMessage'
import Router from 'next/router'
import { useAtom } from 'jotai'
import { usuarioAtom } from '../store'

const Registro = () => {
  const [usuario, setUsuario] = useAtom(usuarioAtom)
  const [errorMsg, setErrorMsg] = useState(null)

  const validationSchema = Yup.object().shape({
    nombre: Yup.string('El nombre debe ser una cadena de texto').required(
      'El nombre es obligatorio'
    ),
    correo: Yup.string()
      .email('Ingresa un correo válido')
      .required('El correo es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
    confPassword: Yup.string()
      .required('La contraseña es obligatoria')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  })

  const handleSubmit = async values => {
    try {
      const registro = await clienteAxios.post('/usuario', values)

      if (!registro) return
      const token = await clienteAxios.post('/login', values)
      localStorage.setItem('token', token.data.token)
      setUsuario({
        auth: true,
        nombre: token.data.nombre,
        aprobado: token.data.aprobado
      })
      Router.push('/')
    } catch (error) {
      setErrorMsg(error.response.data.msg)
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
      console.log(error.response.data)
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      {errorMsg && <CustomErrorMessage msg={errorMsg} />}
      <Formik
        initialValues={{
          nombre: '',
          correo: '',
          password: '',
          confPassword: ''
        }}
        onSubmit={async values => await handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <Form className='flex flex-col flex-wrap gap-7 items-center justify-center w-full'>
          <div className='relative'>
            <Field
              type='text'
              name='nombre'
              placeholder='Nombre de usuario'
              className='border shadow rounded p-1 px-2 w-60 text-center'
            />
            <ErrorMessage
              name='nombre'
              render={msg => (
                <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                  {msg}
                </p>
              )}
            />
          </div>
          <div className='relative'>
            <Field
              type='email'
              name='correo'
              placeholder='Correo'
              className='border shadow rounded p-1 px-2 w-60 text-center'
            />
            <ErrorMessage
              name='correo'
              render={msg => (
                <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                  {msg}
                </p>
              )}
            />
          </div>
          <div className='relative'>
            <Field
              type='password'
              name='password'
              placeholder='Contraseña'
              className='border shadow rounded p-1 px-2 w-60 text-center'
            />
            <ErrorMessage
              name='password'
              render={msg => (
                <p className='text-pink-800 absolute -bottom-6 text-center rounded-full bg-pink-100 w-full shadow shake'>
                  {msg}
                </p>
              )}
            />
          </div>
          <div className='relative'>
            <Field
              type='password'
              name='confPassword'
              placeholder='Confirmar Contraseña'
              className='border shadow rounded p-1 px-2 w-60 text-center'
            />
            <ErrorMessage
              name='confPassword'
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
            Confirmar Registro
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registro

import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import clienteAxios from '../config/axios'

const Login = () => {
  const [auth, setAuth] = useState(false)
  const [usuario, setUsuario] = useState({
    nombre: '',
    aprobado: false
  })

  const validationSchema = Yup.object().shape({
    correo: Yup.string()
      .email('Ingresa un correo valido')
      .required('El correo es obligatorio'),
    password: Yup.string().required('El password es obligatorio')
  })

  const handleSubmit = async values => {
    try {
      const token = await clienteAxios.post('/login', values)
      localStorage.setItem('token', token.data.token)
      console.log(token)
      setUsuario({
        nombre: token.data.nombre,
        aprobado: token.data.aprobado
      })
      setAuth(true)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const { nombre, aprobado } = parseJwt(token)
      setUsuario({
        nombre,
        aprobado
      })
      setAuth(true)
    }
  }, [])

  return (
    <div className='flex justify-end gap-5 items-center'>
      {auth ? (
        <h1
          className={`text-center shadow border rounded-md px-2 text-teal-500 relative ${
            usuario.aprobado && 'aprobado'
          }`}
        >
          {usuario.nombre}
        </h1>
      ) : (
        <Formik
          initialValues={{
            correo: '',
            password: ''
          }}
          onSubmit={async values => await handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <Form className='flex gap-3 items-center'>
            <div className='relative'>
              <Field
                id='correo'
                type='email'
                name='correo'
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
            <button
              type='submit'
              className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-pink-800 hover:scale-105 transition-transform'
            >
              Iniciar Sesion
            </button>
          </Form>
        </Formik>
      )}
      {auth && (
        <button
          className='rounded-full bg-slate-500 text-white px-2 shadow-md hover:bg-pink-800 hover:scale-105 transition-transform'
          onClick={() => {
            logOut()
            setAuth(!auth)
          }}
        >
          Cerrar Sesion
        </button>
      )}
    </div>
  )
}

export default Login

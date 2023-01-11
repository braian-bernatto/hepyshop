import { atom } from 'jotai'

export const usuarioAtom = atom({
  auth: false,
  nombre: '',
  aprobado: false,
  isAdmin: false
})

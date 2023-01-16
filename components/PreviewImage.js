import React, { useState } from 'react'

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState('')
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    setPreview(reader.result)
  }
  return (
    <div className='flex flex-col items-center justify-between text-xs shadow rounded border px-1 py-1 w-32'>
      <img width={100} height={100} alt='image preview' src={preview} />
      <label className='border-t mt-2 w-full text-center'>{file.name}</label>
    </div>
  )
}

export default PreviewImage

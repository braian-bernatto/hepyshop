import Image from 'next/image'
import React from 'react'

const PreviewServerImage = ({ file }) => {
  return (
    <div className='flex flex-col items-center justify-between text-xs shadow rounded border px-1 py-1 w-32'>
      <Image width={100} height={100} alt='server image preview' src={file} />
    </div>
  )
}

export default PreviewServerImage

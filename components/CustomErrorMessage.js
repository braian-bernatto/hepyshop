import React from 'react'

const CustomErrorMessage = ({ msg }) => {
  return (
    <div className='flex justify-center z-50 items-center py-1 px-3 w-72 md:w-96 text-pink-700 text-lg bg-pink-200 rounded text-center'>
      <p>{msg}</p>
    </div>
  )
}

export default CustomErrorMessage

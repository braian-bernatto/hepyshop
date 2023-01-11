import React from 'react'

const CustomErrorMessage = ({ msg }) => {
  return (
    <div className='flex justify-center items-center py-1 px-3 text-pink-700 text-lg bg-pink-200 rounded'>
      <p>{msg}</p>
    </div>
  )
}

export default CustomErrorMessage

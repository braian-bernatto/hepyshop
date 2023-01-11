import React from 'react'

const CustomSuccessMessage = ({ msg }) => {
  return (
    <div className='flex justify-center items-center py-1 px-3 text-teal-700 text-xs bg-teal-200 rounded z-50'>
      <p>{msg}</p>
    </div>
  )
}

export default CustomSuccessMessage

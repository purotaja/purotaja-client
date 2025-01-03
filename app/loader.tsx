import React from 'react'

const Loader = () => {
  return (
    <div className='w-full max-w-screen-2xl mx-auto px-5 md:px-14 py-8 flex items-center justify-center h-screen'>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  )
}

export default Loader;

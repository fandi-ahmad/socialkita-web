import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <div className='text-9xl font-semibold'>404</div>
        <div className='text-3xl mb-2 capitalize'>page not found</div>
        <Link to={'/'} className='text-2xl capitalize hover:underline'>go back</Link>
      </div>
    </div>
  )
}

export default PageNotFound
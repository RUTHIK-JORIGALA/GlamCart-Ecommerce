import React from 'react'
import NotFound from '../components/NotFound'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='max-w-96 mx-auto h-full'>
        <div className='my-10'>

      <NotFound />
        </div>

      <Link to="/" className='my-10 py-3 px-4 bg-primary-dark rounded-md text-white ' >Back to home page</Link>
    </div>
  )
}

export default ErrorPage

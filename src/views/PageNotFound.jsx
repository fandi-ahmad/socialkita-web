import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <div>page not found</div>
      <Link to={'/'}>go back</Link>
    </div>
  )
}

export default PageNotFound
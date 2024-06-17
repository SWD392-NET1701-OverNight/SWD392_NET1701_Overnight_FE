import { chip } from '@material-tailwind/react'
import React from 'react'

function Label({ children, id, className }) {
  return (
    <label htmlFor={id} className={`p-link ${className}`}>
      {children}
    </label>
  )
}

export default Label

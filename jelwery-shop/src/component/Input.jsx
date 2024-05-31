import React from 'react'

function Input({ label, id, type, className, ...rest }) {
  return (
    <>
      <label htmlFor={id} className={`p-link ${className}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required
        className="mt-2 rounded-lg border-2 border-secondary px-4 py-2 outline-none"
        {...rest}
      />
    </>
  )
}

export default Input

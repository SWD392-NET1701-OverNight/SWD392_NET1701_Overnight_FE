import React from 'react'

function Input({ label, id, type, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={`p-link ${className}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required
        className="rounded-lg border-2 border-secondary px-4 py-2 outline-none"
        {...rest}
      />
    </div>
  )
}

export default Input

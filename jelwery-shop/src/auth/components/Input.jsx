import React from 'react';

function Input({ label, id, type, className, ...rest }) {
  return (
    <>
      <label htmlFor={id} className={`p-link ${className}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        className="border-secondary border-2 rounded-lg px-4 py-2 outline-none mt-2"
        {...rest}
      />
    </>
  );
}

export default Input;

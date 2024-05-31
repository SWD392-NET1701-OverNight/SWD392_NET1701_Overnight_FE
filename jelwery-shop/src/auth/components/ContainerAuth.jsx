import React from 'react'

function ContainerAuth({ title, children }) {
  return (
    <>
      <h1 className="title">{title}</h1>
      {children}
    </>
  )
}

export default ContainerAuth

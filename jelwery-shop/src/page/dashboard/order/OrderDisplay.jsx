import React from 'react'

function OrderDisplay({ title, value }) {
  return (
    <p className="flex text-base font-normal text-third">
      {title}
      <span className="block truncate text-secondary">{value}</span>
    </p>
  )
}

export default OrderDisplay

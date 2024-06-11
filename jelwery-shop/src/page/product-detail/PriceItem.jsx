import React from 'react'

function PriceItem({ title, price }) {
  return (
    <div>
      <p className="text-lg  font-normal uppercase text-secondary">{title}</p>
      <p className="mt-2 w-[10vw] rounded-lg border border-secondary px-2 py-2 text-center text-base text-secondary">
        ${price}
      </p>
    </div>
  )
}

export default PriceItem

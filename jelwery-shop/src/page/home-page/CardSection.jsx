import React from 'react'
import { jewelryData } from '../../data'

function CardSection({ children, ...props }) {
  return (
    <div className="flex-1" {...props}>
      <img
        src={jewelryData[0].image}
        alt="image-jelwery"
        className="image h-[240px] w-full rounded-xl"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="max-w-[120px]">
          <h3 className="truncate text-xl font-semibold text-secondary">Product Name</h3>
          <p className="text-third">Description</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardSection

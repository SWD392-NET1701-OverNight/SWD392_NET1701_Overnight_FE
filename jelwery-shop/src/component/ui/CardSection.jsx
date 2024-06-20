import React from 'react'
import { jewelryData } from '../../data'
import { Tooltip } from '@material-tailwind/react'

function CardSection({ className, description, children, name, ...props }) {
  return (
    <div className={`cursor-pointer ${className}`} {...props}>
      <img
        src={jewelryData[0].image}
        alt="image-jelwery"
        className="image h-[240px] w-full rounded-xl"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="max-w-[120px]">
          <Tooltip content={<p className="tooltip">{name}</p>}>
            <h3 className="truncate text-xl font-semibold text-secondary">{name}</h3>
          </Tooltip>
          <Tooltip content={<p className="tooltip">{description}</p>}>
            <p className="truncate text-third">{description}</p>
          </Tooltip>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardSection

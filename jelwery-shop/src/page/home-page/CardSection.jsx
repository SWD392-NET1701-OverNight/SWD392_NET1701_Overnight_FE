import React from 'react'

function CardSection({ children, title, image, alt, description }) {
  return (
    <div className="flex-1">
      <img src={image} alt={alt} className="image h-[240px] w-full rounded-xl" />
      <div className="mt-2 flex items-center justify-between">
        <div className="max-w-[120px]">
          <h3 className="truncate text-xl font-semibold text-secondary">{title}</h3>
          <p className="text-third">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardSection

import React from 'react'

function HeadingSection({ title }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-[8px] rounded-md bg-primary"></div>
      <h2 className="title">{title}</h2>
    </div>
  )
}

export default HeadingSection

import React from 'react'

function ParagraphOrderCard({ title, value }) {
  return (
    <p className="text-xl font-semibold text-secondary">
      {title}:<span className="text-lg text-third">{value}</span>
    </p>
  )
}

export default ParagraphOrderCard

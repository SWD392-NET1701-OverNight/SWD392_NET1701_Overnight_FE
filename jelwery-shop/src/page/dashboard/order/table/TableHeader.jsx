import React from 'react'

function TableHeader({ TABLE_HEAD }) {
  return (
    <thead className="border-y border-third ">
      <tr>
        {TABLE_HEAD.map((head, index) => (
          <th key={index} className="px-8 py-2 text-base font-normal text-secondary">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader

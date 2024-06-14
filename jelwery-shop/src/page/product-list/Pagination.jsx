import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

function Pagination({ perPage, length, curentPage, setCurrentPage }) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(length / perPage); i++) {
    pageNumbers.push(i)
  }
  function handleClickPage(page) {
    setCurrentPage(page)
  }
  function handleClickPrev(curentPage) {
    if (curentPage === 1) return
    setCurrentPage((prev) => prev - 1)
  }
  function handleClickNext(curentPage) {
    if (curentPage === pageNumbers.length) return
    setCurrentPage((prev) => prev + 1)
  }
  return (
    <>
      <div className="flex items-center gap-4 text-secondary">
        <button
          disabled={curentPage === 1}
          onClick={() => {
            handleClickPrev(curentPage)
          }}
        >
          <ArrowLeft size={24} strokeWidth={1.75} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`rounded-lg px-4 py-2 text-secondary ${curentPage === number && 'bg-fourth'}`}
            onClick={() => {
              handleClickPage(number)
            }}
          >
            {number}
          </button>
        ))}
        <button
          disabled={curentPage === pageNumbers.length}
          onClick={() => {
            handleClickNext()
          }}
        >
          <ArrowRight size={24} strokeWidth={1.75} />
        </button>
      </div>
    </>
  )
}

export default Pagination

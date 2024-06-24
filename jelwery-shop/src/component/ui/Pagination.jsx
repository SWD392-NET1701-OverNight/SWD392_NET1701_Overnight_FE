import { ArrowLeft, ArrowRight } from 'lucide-react'
import ReactPaginate from 'react-paginate'

function Pagination({ perPage, itemLength, setCurrentPage }) {
  return (
    <ReactPaginate
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      activeClassName={'active-page-item'}
      onPageChange={(event) => setCurrentPage(event.selected)}
      pageCount={Math.ceil(itemLength / perPage)}
      breakLabel="..."
      previousLabel={<ArrowLeft size={24} strokeWidth={1.75} />}
      nextLabel={<ArrowRight size={24} strokeWidth={1.75} />}
    />
  )
}

export default Pagination

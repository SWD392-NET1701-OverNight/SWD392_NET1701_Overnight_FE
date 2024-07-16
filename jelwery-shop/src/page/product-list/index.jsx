import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { caculatePagination } from '../../utils/calculatePagination'
import FilterProductList from './FilterProductList'
import ListProduct from './ListProduct'
function ProductList() {
  const [curentPage, setCurrentPage] = useState(0)
  const { listProduct } = useSelector((state) => state.product)
  const [filterProduct, setFilterProduct] = useState([])
  const perPage = 8
  const currentData = caculatePagination(perPage, curentPage, filterProduct)

  useEffect(() => {
    if (listProduct.length > 0) {
      setFilterProduct(listProduct)
    }
  }, [listProduct.length])
  return (
    <div className="px-[14%] py-[4vh]">
      <ListProduct
        listProduct={listProduct}
        setFilterProduct={setFilterProduct}
        currentData={currentData}
        filterProduct={filterProduct}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default ProductList

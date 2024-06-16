import { useSelector } from 'react-redux'
import CardSection from '../../component/ui/CardSection'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagination'
import { useState } from 'react'

function ProductList() {
  const navigate = useNavigate()
  const [curentPage, setCurrentPage] = useState(1)
  const { listProduct } = useSelector((state) => state.product)
  const perPage = 9
  const startPoint = (curentPage - 1) * perPage
  const endPoint = curentPage * perPage
  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  return (
    <div className="flex gap-6 px-[14%]">
      <div className="w-1/4 bg-blue-gray-100">Filter</div>
      <div className="w-3/4  py-[4vh]">
        <h2 className="title mb-[30px]">Jewelry Products</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {listProduct
            .slice(startPoint, endPoint)
            .map(({ productID, priceMaterial, priceDesign, processPrice, productName }, index) => (
              <CardSection
                key={index}
                className="flex-1"
                name={productName}
                onClick={() => handleClickProductDetail(productID)}
              >
                <p className="bg-fourth px-2 py-2 text-third">
                  ${priceDesign + priceMaterial + processPrice}
                </p>
              </CardSection>
            ))}
        </div>
        <div className="mt-[40px] flex justify-center">
          <Pagination
            length={listProduct.length}
            perPage={perPage}
            curentPage={curentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductList

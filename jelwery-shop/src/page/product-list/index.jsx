import { useSelector } from 'react-redux'
import CardSection from '../../component/ui/CardSection'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Pagination from '../../component/ui/Pagination'
import { caculatePagination } from '../../utils/calculatePagination'
import Button from '../../component/ui/Button'
function ProductList() {
  const navigate = useNavigate()
  const [curentPage, setCurrentPage] = useState(0)
  const { listProduct } = useSelector((state) => state.product)
  const perPage = 6
  const currentData = caculatePagination(perPage, curentPage, listProduct)
  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  function handleClickRequestDesign() {
    navigate('/request-design')
  }
  return (
    <div className="flex gap-6 px-[14%]">
      <div className="w-1/4 bg-blue-gray-100">Filter</div>
      <div className="w-3/4  py-[4vh]">
        <div className="center-space  mb-[30px]">
          <h2 className="title">Jewelry Products</h2>
          <Button
            type="primary"
            onClick={() => {
              handleClickRequestDesign()
            }}
          >
            Request with design
          </Button>
        </div>
        <div className="grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3">
          {currentData.map(
            ({ productID, priceMaterial, priceDesign, processPrice, productName }, index) => (
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
            ),
          )}
        </div>
        <div className="center mt-[40px] box-border flex-col">
          <Pagination
            itemLength={listProduct.length}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductList

import { useSelector } from 'react-redux'
import CardSection from '../../component/ui/CardSection'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function ProductList() {
  const navigate = useNavigate()
  const [curentPage, setCurrentPage] = useState(0)
  const { listProduct } = useSelector((state) => state.product)

  const perPage = 5
  const startPoint = curentPage * perPage
  const endPoint = startPoint + perPage
  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  return (
    <div className="flex gap-6 px-[14%]">
      <div className="w-1/4 bg-blue-gray-100">Filter</div>
      <div className="w-3/4  py-[4vh]">
        <h2 className="title mb-[30px]">Jewelry Products</h2>
        <div className="grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3">
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
        <div className="center mt-[40px] box-border flex-col">
          <ReactPaginate
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            activeClassName={'active-page-item'}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(listProduct.length / perPage)}
            breakLabel="..."
            previousLabel={<ArrowLeft size={24} strokeWidth={1.75} />}
            nextLabel={<ArrowRight size={24} strokeWidth={1.75} />}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductList

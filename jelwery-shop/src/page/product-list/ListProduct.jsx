import Button from '../../component/ui/Button'
import CardSection from '../../component/ui/CardSection'
import Pagination from '../../component/ui/Pagination'
import { useNavigate } from 'react-router-dom'
import FilterProductList from './FilterProductList'
function ListProduct({
  setCurrentPage,
  perPage,
  filterProduct,
  currentData,
  listProduct,
  setFilterProduct,
}) {
  const navigate = useNavigate()
  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  function handleClickRequestDesign() {
    navigate('/request-design')
  }
  return (
    <>
      <div className="center-space mb-[30px]">
        <h2 className="title">Jewelry Products</h2>
        <div className="flex gap-4">
          <FilterProductList listProduct={listProduct} setFilterProduct={setFilterProduct} />
          <Button
            type="primary"
            onClick={() => {
              handleClickRequestDesign()
            }}
          >
            Request with design
          </Button>
        </div>
      </div>
      <div className="grid list-none gap-4 md:grid-cols-2 xl:grid-cols-4">
        {currentData?.map(
          ({ productID, priceMaterial, priceDesign, processPrice, productName, image }, index) => (
            <CardSection
              key={index}
              className="flex-1"
              image={
                image ||
                'https://media.istockphoto.com/id/1611670229/fr/photo/bagues-en-diamant-bijoux-accessoires-de-luxe-mode.webp?b=1&s=170667a&w=0&k=20&c=Bh32UxEVqpafwGJsSh_qn6uHGXHZfwEZZMaO0M6H51E='
              }
              name={productName}
              onClick={() => handleClickProductDetail(productID)}
            >
              <p className="bg-fourth px-2 py-2 text-third">
                {(priceDesign + priceMaterial + processPrice) * 100} VND
              </p>
            </CardSection>
          ),
        )}
      </div>
      <div className="center mt-[40px] box-border flex-col">
        <Pagination
          itemLength={filterProduct?.length}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}

export default ListProduct

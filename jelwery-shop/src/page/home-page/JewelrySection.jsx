import { useEffect } from 'react'
import ContainerSection from './ContainerSection'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardSection from '../../component/ui/CardSection'

function JewelrySection() {
  const { listProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: 'PRODUCT_LIST_SAGA' })
  }, [])
  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  return (
    <ContainerSection title="Jewelry">
      {listProduct
        .slice(0, 4)
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
    </ContainerSection>
  )
}

export default JewelrySection

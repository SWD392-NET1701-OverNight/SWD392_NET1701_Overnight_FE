import { useEffect } from 'react'
import ContainerSection from './ContainerSection'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardSection from '../../component/ui/CardSection'

function JewelrySection() {
  const { listProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClickProductDetail(productID) {
    navigate(`/product-list/${productID}`)
  }
  useEffect(() => {
    dispatch({ type: 'PRODUCT_LIST_SAGA' })
  }, [])
  return (
    <ContainerSection title="Jewelry">
      {listProduct
        ?.slice(0, 4)
        .map(
          (
            {
              productID,
              priceMaterial,
              description,
              priceDesign,
              processPrice,
              productName,
              image,
            },
            index,
          ) => (
            <CardSection
              key={index}
              image={image}
              className="flex-1"
              name={productName}
              description={description}
              onClick={() => handleClickProductDetail(productID)}
            >
              <p className="bg-fourth px-2 py-2 text-third">
                ${priceDesign + priceMaterial + processPrice}
              </p>
            </CardSection>
          ),
        )}
    </ContainerSection>
  )
}

export default JewelrySection

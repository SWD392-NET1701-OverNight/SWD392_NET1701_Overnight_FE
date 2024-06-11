import React, { useEffect } from 'react'
import ContainerSection from './ContainerSection'
import CardSection from './CardSection'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
        .map(({ productID, priceMaterial, priceDesign, processPrice }, index) => (
          <CardSection key={index} onClick={() => handleClickProductDetail(productID)}>
            <p className="bg-fourth px-2 py-2 text-third">
              ${priceDesign + priceMaterial + processPrice}
            </p>
          </CardSection>
        ))}
    </ContainerSection>
  )
}

export default JewelrySection

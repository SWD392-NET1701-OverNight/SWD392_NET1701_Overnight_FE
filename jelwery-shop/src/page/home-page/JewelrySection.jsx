import React, { useEffect } from 'react'
import ContainerSection from './ContainerSection'
import CardSection from './CardSection'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function JewelrySection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { listProduct } = useSelector((state) => state.product)
  function handleClickProductDetail(id) {
    navigate(`product-list/${id}`)
  }
  useEffect(() => {
    dispatch({ type: 'PRODUCT_LIST_SAGA' })
  }, [])
  return (
    <ContainerSection title="Jewelry">
      {listProduct.map((item, index) => (
        <CardSection key={index} {...item} onClick={() => handleClickProductDetail(item.productId)}>
          <p className="bg-fourth px-2 py-2 text-third">$2,500</p>
        </CardSection>
      ))}
    </ContainerSection>
  )
}

export default JewelrySection

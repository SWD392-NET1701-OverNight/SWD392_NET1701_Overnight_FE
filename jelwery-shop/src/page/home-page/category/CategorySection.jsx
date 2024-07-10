import React, { useEffect } from 'react'
import CategoryItem from './CategoryItem'
import ContainerSection from '../ContainerSection'
import { categoryItemsData } from '../../../data/index'
import { useDispatch, useSelector } from 'react-redux'

function CategorySection() {
  const dispatch = useDispatch()
  const { listCategory } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch({ type: 'GET_ALL_CATEGORY_SAGA' })
  }, [])
  return (
    <ContainerSection title="Category">
      {listCategory?.slice(0, 4).map((categoryItem, index) => (
        <CategoryItem key={index} {...categoryItem} />
      ))}
    </ContainerSection>
  )
}

export default CategorySection

import React from 'react'
import CategoryItem from './CategoryItem'
import ContainerSection from '../ContainerSection'
import { categoryItemsData } from '../../../data/index'

function CategorySection() {
  return (
    <ContainerSection title="Category">
      {categoryItemsData.map((category, index) => (
        <CategoryItem key={index} {...category} />
      ))}
    </ContainerSection>
  )
}

export default CategorySection

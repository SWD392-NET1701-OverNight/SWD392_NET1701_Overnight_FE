import React from 'react'
import ContainerSection from './ContainerSection'
import CardSection from './CardSection'
import { jewelryData } from '../../data'

function JewelrySection() {
  return (
    <ContainerSection title="Jewelry">
      {jewelryData.map((item, index) => (
        <CardSection key={index} {...item}>
          <p className="bg-fourth px-2 py-2 text-third">$2,500</p>
        </CardSection>
      ))}
    </ContainerSection>
  )
}

export default JewelrySection

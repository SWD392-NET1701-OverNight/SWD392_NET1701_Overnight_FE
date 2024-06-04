import React from 'react'
import ContainerSection from '../ContainerSection.jsx'
import FeatureItem from './FeatureItem'
import { featureItemsData } from '../../../data/index.js'
function FeatureSection() {
  return (
    <ContainerSection title="Features" className="text-center">
      {featureItemsData.map((item, index) => (
        <FeatureItem key={index} {...item} />
      ))}
    </ContainerSection>
  )
}

export default FeatureSection

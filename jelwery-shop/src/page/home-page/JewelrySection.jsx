import React from 'react'
import ContainerSection from './ContainerSection'

function JewelrySection() {
  const jewelries = [1, 2, 3, 4]
  return (
    <ContainerSection title="Jewelry">
      {jewelries.map(() => (
        <div className="shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpYW1vbmQlMjByaW5nfGVufDB8fDB8fHww"
            alt="diamond-ring"
            className="image h-[240px]"
          />
          <div className="flex items-center justify-between px-4 py-2">
            <div>
              <h3 className="text-lg font-semibold text-secondary">Diamond Ring</h3>
              <p className="text-third">Description</p>
            </div>
            <p className="bg-fourth px-2 py-2 text-third">$2,500</p>
          </div>
        </div>
      ))}
    </ContainerSection>
  )
}

export default JewelrySection

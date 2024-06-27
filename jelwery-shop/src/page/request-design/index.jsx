import React from 'react'
import { Tooltip } from '@material-tailwind/react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import Button from '../../component/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'

function RequestDesign() {
    return (
        <div className="flex w-full px-[14%] pt-[50px]">
          <img
            src="https://images.unsplash.com/photo-1611085582956-da557acbc3a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5lY2tsYWNlfGVufDB8fDB8fHww"
            alt="necklace"
            className="image h-[100vh] w-1/2 rounded-lg"
          />
          <div className="w-1/2 px-[7%] py-[2%]">
            <h1 className="title">{productDetail.productName}</h1>
            <div className="mt-2 flex items-center">
              <h3 className="text-lg text-secondary">Category</h3>
              <p className="ml-8 text-base text-third">{productDetail.categoryName}</p>
            </div>
            <Tooltip content={<p className="tooltip">{productDetail.description}</p>}>
              <p className="mt-4 w-full truncate text-lg text-third">{productDetail.description}</p>
            </Tooltip>
    
            <div className="mt-4 flex justify-between">
              <PriceItem title="Material Price" price={productDetail.materialPrice} />
              <PriceItem title="Proccessing Price" price={productDetail.processPrice} />
            </div>
            <div className="mt-8">
              <PriceItem title="Design Price" price={productDetail.designPrice} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="mt-4 text-lg text-secondary">Material</p>
              <ul className="flex list-none gap-2">
                {productDetail?.materials?.$values.map(({ materialName }, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    {materialName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex items-center space-x-4">
              <Button
                type="primary"
                onClick={() => {
                  handleBuyNow()
                }}
              >
                Buy Now
              </Button>
              <Button
                type="secondary"
                onClick={() => {
                  handleCustomProduct()
                }}
              >
                Custom
              </Button>
              <p className="text-xl font-medium text-secondary">${totalPrice}</p>
            </div>
          </div>
        </div>
      )
}

export default RequestDesign
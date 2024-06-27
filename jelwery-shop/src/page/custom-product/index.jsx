import { useForm } from 'react-hook-form'
import Button from '../../component/ui/Button'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Tooltip } from '@material-tailwind/react'

import { sendHttp } from '../../utils/send-http'
import productMaterailApi from '../../feature/product-material/productMaterialApi'
import requestApi from '../../feature/request/requestApi'
import { getToken } from '../../utils/auth'

function CustomProduct() {
  const { state } = useLocation()
  const { productDetail } = useSelector((state) => state.product)
  const { currentUser } = useSelector((state) => state.auth)
  const [productMaterials, setProductMaterials] = useState([...productDetail.materials.$values])
  const { register, handleSubmit } = useForm()
  function handleChangeQuantity(e) {
    const { name, value } = e.target
    const id = Number(name)
    setProductMaterials((prev) =>
      prev.map((material) => {
        if (material.materialID === id) {
          return { ...material, quantity: value }
        }
        return material
      }),
    )
  }
  const totalPriceMaterials = productMaterials.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0,
  )
  const onSubmit = async (data) => {
    const { status } = await sendHttp(
      productMaterailApi.updateProductMaterial,
      productMaterials,
      state.customProductId,
      null,
      false,
    )
    if (status === 'success') {
      if (!getToken()) {
        toast.error('Please login to buy this product')
        return
      }
      const checkoutData = {
        fullName: currentUser.fullName,
        description: 'Buy product',
        createdDate: new Date().toISOString(),
        amount: totalPriceMaterials,
        productID: state.customProductId,
      }

      const { status, resData } = await sendHttp(
        requestApi.checkout,
        checkoutData,
        currentUser.userId,
        { success: 'Go to checkout page', error: '' },
      )
      if (status === 'success') {
        window.location.href = resData
      }
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {productDetail?.materials.$values?.map(
              ({ materialName, materialID, quantity, price }, index) => (
                <div key={index} className="center gap-4">
                  <label htmlFor={index} className="text-lg text-secondary">
                    {materialName}
                  </label>
                  <input
                    type="number"
                    className="ml-4 rounded-md border border-gray-300 px-2 py-2 text-center outline-none"
                    {...register(`${materialID}`)}
                    onChange={handleChangeQuantity}
                    defaultValue={quantity}
                    min={4}
                  />
                  <p className="text-lg text-third">{price} VND</p>
                </div>
              ),
            )}
          </div>
          <div className="flex gap-4">
            <Button type="primary" className="mt-4">
              Submit
            </Button>
            <div className="mt-4 flex items-center">
              <h3 className="text-lg font-medium text-secondary">Total price</h3>
              <p className="ml-8 text-lg text-third">{totalPriceMaterials} VND</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomProduct

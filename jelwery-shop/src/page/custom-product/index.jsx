import { useForm } from 'react-hook-form'
import Button from '../../component/ui/Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Tooltip } from '@material-tailwind/react'

import { sendHttp } from '../../utils/send-http'
import productMaterailApi from '../../feature/product-material/productMaterialApi'
import { useCheckout } from '../../hooks'
import { toast } from 'sonner'

function CustomProduct() {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { productDetail } = useSelector((state) => state.product)
  const { listMaterial } = useSelector((state) => state.material)
  const [productMaterials, setProductMaterials] = useState([...productDetail.materials.$values])
  const { register, handleSubmit } = useForm()
  const { handeCheckout } = useCheckout()
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
  const totalPriceMaterials = productMaterials?.reduce((acc, { quantity, materialID }) => {
    const material = listMaterial?.find((material) => material.materialID === materialID)
    return acc + quantity * material?.price
  }, 0)
  const onSubmit = async (data) => {
    const { status } = await sendHttp(
      productMaterailApi.updateProductMaterial,
      productMaterials,
      state.customProductId,
      null,
      false,
    )
    if (status === 'success') {
      handeCheckout(state.customProductId, totalPriceMaterials * 100, '2')
    }
  }
  useEffect(() => {
    dispatch({ type: 'GET_LIST_MATERIAL_SAGA' })
  }, [])
  return (
    <div className="flex w-full px-[14%] pt-[50px]">
      <img src={productDetail?.image} alt="necklace" className="image h-[100vh] w-1/2 rounded-lg" />
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
            {productMaterials?.map(({ materialName, materialID, quantity }, index) => {
              const material = listMaterial?.find((material) => material.materialID === materialID)
              return (
                <div key={index} className="center gap-4">
                  <label htmlFor={index} className="text-lg text-secondary">
                    {materialName}
                  </label>
                  <input
                    type="number"
                    className="ml-4 flex-1 rounded-md border border-gray-300 px-2 py-2 text-center outline-none"
                    {...register(`${materialID}`)}
                    onChange={handleChangeQuantity}
                    defaultValue={quantity}
                    min={1}
                    required
                  />
                  <p className="text-nowrap text-lg text-third">1g / {material?.prices} VND</p>
                </div>
              )
            })}
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

import { set, useForm } from 'react-hook-form'
import Button from '../../component/ui/Button'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from '@material-tailwind/react'

import { extractTrueFields } from '../../utils/extractTrueFields'
import { sendHttp } from '../../utils/send-http'
import productMaterailApi from '../../feature/product-material/productMaterialApi'
import requestApi from '../../feature/request/requestApi'

function CustomProduct() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  const { productDetail } = useSelector((state) => state.product)
  const { listMaterial } = useSelector((state) => state.material)
  const { listProductMaterial } = useSelector((state) => state.productMaterial)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const materialFromOldProduct = listProductMaterial
    ?.map((pm) => {
      const material = listMaterial.find((m) => m.materialID === pm.materialID)
      return material
        ? {
            materialName: material.name,
            productMaterialID: pm.productMaterialID,
            quantity: pm.quantity,
          }
        : null
    })
    .filter((item) => item !== null)
  const onSubmit = async (data) => {
    const exactData = extractTrueFields(data)
    const updateProductMaterialData = listProductMaterial
      .map((pm) => {
        const result = exactData.find((d) => d.productMaterialID === pm.productMaterialID)
        return result
          ? {
              ...pm,
              quantity: result.amount,
            }
          : null
      })
      .filter((item) => item !== null)
    const { status } = await sendHttp(
      productMaterailApi.updateProductMaterial,
      updateProductMaterialData,
      state.customProductId,
      { success: 'Update product material success', error: 'Update product material failed' },
    )

    const requestData = {
      description: 'test',
      status: 'Pending',
      productID: state.customProductId,
      image:
        'https://media.istockphoto.com/id/2150388806/fr/photo/femme-bijoutier-produit-%C3%A0-la-main-une-bague-utilise-une-r%C3%A2pe-en-m%C3%A9tal-atelier-dartisanat.webp?b=1&s=170667a&w=0&k=20&c=ow5Z_ntXervWb9NtZ568xca1NUbtPBjeeQeZ0Xyjdxo=',
      type: 2,
    }
    if (status === 'success') {
      const { status } = await sendHttp(requestApi.createRequest, requestData, currentUser.userID)
      if (status === 'success') {
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    }
  }

  useEffect(() => {
    dispatch({ type: 'PRODUCT_MATERIAL_BY_ID', payload: productDetail.productID })
    dispatch({ type: 'GET_LIST_MATERIAL_SAGA' })
  }, [])
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
          <p className="ml-8 text-base text-third">Ring</p>
        </div>
        <Tooltip content={<p className="tooltip">{productDetail.description}</p>}>
          <p className="mt-4 w-full truncate text-lg text-third">{productDetail.description}</p>
        </Tooltip>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {materialFromOldProduct?.map(({ materialName, productMaterialID, quantity }, index) => (
              <div key={index} className="center gap-4">
                <input type="checkbox" id={index} {...register(`${productMaterialID}`)} />
                <label htmlFor={index} className="text-lg text-secondary">
                  {materialName}
                </label>
                <input
                  type="number"
                  className="ml-4 rounded-md border border-gray-300 px-2 py-2 text-center outline-none"
                  {...register(`${productMaterialID}-amount`)}
                  defaultValue={quantity}
                />
              </div>
            ))}
          </div>
          <Button type="primary" className="mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CustomProduct

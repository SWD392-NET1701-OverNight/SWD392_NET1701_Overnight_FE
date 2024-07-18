import { useForm } from 'react-hook-form'
import ContainerAuth from '../../../../auth/components/ContainerAuth'
import Input from '../../../../component/ui/Input'
import Modal from '../../../../component/ui/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-tailwind/react'
import { sendHttp } from '../../../../utils/send-http'
import productApi from '../../../../feature/product/productApi'
import { useEffect, useState } from 'react'
import Button from '../../../../component/ui/Button'
import { toast } from 'sonner'
import { productAction } from '../../../../feature/product/productSlice'
import { createProductSchemaBySystem } from '../../../../schema/createProductSchema'
import ErrorInput from '../../../../component/ui/ErrorInput'
import { zodResolver } from '@hookform/resolvers/zod'

function ModalUpdateProduct({ open, handler, productId }) {
  const dispatch = useDispatch()
  const { listCategory } = useSelector((state) => state.category)
  const { listDesign } = useSelector((state) => state.design)
  const [productDetail, setProductDetail] = useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(createProductSchemaBySystem) })

  const onSubmit = async (data) => {
    const updateData = { ...productDetail, ...data }

    const { resData } = await sendHttp(productApi.updateProduct, updateData, null, null)
    if (resData) {
      dispatch(productAction.updateProduct({ productID: productId, data: updateData }))
      handler()
    }
  }
  async function getProductDetail() {
    const { resData } = await sendHttp(productApi.getProductById, productId, null, null, false)
    if (resData) {
      setProductDetail(resData)
    }
  }

  useEffect(() => {
    if (open) {
      getProductDetail()
    }
    reset({
      productName: productDetail?.productName,
      description: productDetail?.description,
      categoryID: productDetail?.categoryID,
      designID: productDetail?.designID,
      priceDesign: productDetail?.priceDesign,
      processPrice: productDetail?.processPrice,
    })
  }, [open, JSON.stringify(productDetail)])
  return (
    <Modal open={open} handler={handler}>
      <div className="px-2 py-2 text-black">
        <ContainerAuth title="Update Product">
          <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Product Name" id="name" {...register('productName')} />
            {errors.productName?.message && <ErrorInput>{errors.productName?.message}</ErrorInput>}

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-medium text-third">
                Description
              </label>
              <textarea id="description" {...register('description')} className="input"></textarea>
              {errors.description?.message && (
                <ErrorInput>{errors.description?.message}</ErrorInput>
              )}
            </div>
            <div className="mb-2 flex gap-4">
              <div className="w-full">
                <label htmlFor="priceDesign" className="block text-lg font-medium text-third">
                  Price Design
                </label>
                <input
                  type="number"
                  {...register('priceDesign', {
                    setValueAs: (value) => (value === '' ? null : Number(value)),
                  })}
                  id="priceDesign"
                  className="input w-full"
                />
                {errors.priceDesign?.message && (
                  <ErrorInput>{errors.priceDesign?.message}</ErrorInput>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="processPrice" className="block text-lg font-medium text-third">
                  Process Price
                </label>
                <input
                  type="number"
                  {...register('processPrice', {
                    setValueAs: (value) => (value === '' ? null : Number(value)),
                  })}
                  id="processPrice"
                  className="input w-full"
                />
                {errors.processPrice?.message && (
                  <ErrorInput>{errors.processPrice?.message}</ErrorInput>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-medium text-third">
                Category
              </label>
              <select
                className="input"
                id="category"
                {...register('categoryID', {
                  setValueAs: (value) => (value === '' ? null : Number(value)),
                })}
              >
                {listCategory.map(({ catID, catName }, index) => (
                  <option key={index} value={catID}>
                    {catName}
                  </option>
                ))}
              </select>
              {errors.categoryID?.message && <ErrorInput>{errors.categoryID?.message}</ErrorInput>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="design" className="font-medium text-third">
                Design
              </label>
              <select
                className="input"
                id="design"
                {...register('designID', {
                  setValueAs: (value) => (value === '' ? null : Number(value)),
                })}
              >
                {listDesign?.map(({ designID, description }, index) => (
                  <option key={index} value={designID}>
                    {<p>{description}</p>}
                  </option>
                ))}
              </select>
              {errors.designID?.message && <ErrorInput>{errors.designID?.message}</ErrorInput>}
            </div>
            <div className="mt-2 flex gap-2">
              <Button type="primary">Submit</Button>
              <button
                type="button"
                className="btn border border-secondary text-primary"
                onClick={() => {
                  handler()
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </ContainerAuth>
      </div>
    </Modal>
  )
}

export default ModalUpdateProduct

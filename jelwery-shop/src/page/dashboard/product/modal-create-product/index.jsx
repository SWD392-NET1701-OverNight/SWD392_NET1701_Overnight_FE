import { useDispatch, useSelector } from 'react-redux'
import { Option, Select } from '@material-tailwind/react'
import { useUploadImage } from '../../../../hooks/useUploadImage'
import { useState } from 'react'
import { CirclePlus, Trash2 } from 'lucide-react'
import { sendHttp } from '../../../../utils/send-http'
import productApi from '../../../../feature/product/productApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorInput from '../../../../component/ui/ErrorInput'
import { productAction } from '../../../../feature/product/productSlice'
import Modal from '../../../../component/ui/Modal'
import Button from '../../../../component/ui/Button'
import { createProductSchemaBySystem } from '../../../../schema/createProductSchema'
import { toast } from 'sonner'

function ModalCreateProduct({ open, handler }) {
  const dispatch = useDispatch()
  const { listDesign } = useSelector((state) => state.design)
  const { listCategory } = useSelector((state) => state.category)
  const { listMaterial } = useSelector((state) => state.material)
  const [materials, setMaterials] = useState([])
  const { hanldeUpload, imageUrl } = useUploadImage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchemaBySystem),
  })
  const handleAddMaterial = () => {
    setMaterials((prev) => {
      const newMaterial = [...prev.map((item) => ({ ...item }))]
      newMaterial.push({ materialID: '', materialName: '', quantity: 1, price: 0 })
      return newMaterial
    })
  }
  const handleDeleteMaterial = (materialID) => {
    setMaterials((prev) => {
      const newMaterial = prev.filter((item) => item.materialID !== materialID)
      return newMaterial
    })
  }
  const handleChangeMaterialId = (value, index) => {
    setMaterials((prev) => {
      const newMaterial = [...prev.map((item) => ({ ...item }))]
      newMaterial[index].materialID = value
      const materialItem = listMaterial?.find(({ materialID }) => materialID === value)
      newMaterial[index].materialName = materialItem?.name
      return newMaterial
    })
  }
  const handleChangeQuantity = (e, index) => {
    const { value } = e.target
    setMaterials((prev) => {
      const newMaterial = [...prev.map((item) => ({ ...item }))]
      newMaterial[index].quantity = value
      const metrialItem = listMaterial?.find(
        ({ materialID }) => materialID === newMaterial[index].materialID,
      )
      newMaterial[index].price = value * metrialItem?.price
      return newMaterial
    })
  }
  const onSubmit = async (data) => {
    const allData = { ...data }
    allData.image = imageUrl
    allData.status = 'System'
    allData.priceMaterial = materials.reduce((acc, item) => acc + item.price, 0)
    const productData = {
      product: {
        ...allData,
      },
      materials,
    }
    const { resData } = await sendHttp(productApi.createProduct, productData)

    if (resData) {
      dispatch(productAction.addProduct(resData))
      handler()
    }
  }

  return (
    <Modal open={open} handler={handler}>
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h1 className="title mb-4">Create Product</h1>
            <Button type="primary" className="font-medium">
              Create
            </Button>
          </div>
          <div className="mb-2 flex gap-4">
            <div className="w-full">
              <label htmlFor="productName" className="block text-lg font-medium text-third">
                Product Name
              </label>
              <input
                type="text"
                {...register('productName')}
                id="productName"
                className="input w-full"
              />
              {errors.productName?.message && (
                <ErrorInput>{errors.productName?.message}</ErrorInput>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="description" className="block text-lg font-medium text-third">
                Description
              </label>
              <input
                type="text"
                {...register('description')}
                id="description"
                className="input w-full"
              />
              {errors.description?.message && (
                <ErrorInput>{errors.description?.message}</ErrorInput>
              )}
            </div>
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
            <label htmlFor="design" className="text-lg font-medium text-third">
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
                  <p>{description}</p>
                </option>
              ))}
            </select>
            {errors.designID?.message && <ErrorInput>{errors.designID?.message}</ErrorInput>}
          </div>
          <label htmlFor="category" className="block text-lg font-medium text-third">
            Category
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <select
                id="category"
                name="categoryID"
                {...register('categoryID', {
                  setValueAs: (value) => (value === '' ? null : Number(value)),
                })}
                className="w-full rounded-md border-2 border-secondary px-2 py-3 text-third outline-none"
              >
                {listCategory.map(({ catID, catName }) => (
                  <option key={catID} value={catID}>
                    {catName}
                  </option>
                ))}
              </select>
              {errors.categoryID?.message && <ErrorInput>{errors.categoryID?.message}</ErrorInput>}
            </div>
            <div className="flex w-1/2 items-center gap-4">
              {imageUrl && (
                <img src={imageUrl} alt="product" className="image h-24 w-24 rounded-lg" />
              )}

              <button
                type="button"
                className="btn bg-fourth text-lg font-medium text-black"
                onClick={() => {
                  hanldeUpload()
                }}
              >
                {imageUrl ? 'Change Image' : 'Upload Image'}
              </button>
            </div>
          </div>
        </form>
        <div className="mt-2 text-third">
          <h2 className="text-xl font-medium">Material</h2>
          <div className="space-y-4">
            {materials.map((item, index) => (
              <div className="flex w-full items-center gap-4">
                <div className="w-2/3">
                  <Select
                    label="Material"
                    name="materialID"
                    onChange={(e) => {
                      handleChangeMaterialId(e, index)
                    }}
                  >
                    {listMaterial.map(({ materialID, name }) => (
                      <Option value={materialID}>{name}</Option>
                    ))}
                  </Select>
                </div>
                <input
                  type="number"
                  required
                  className="input w-[20%]"
                  min="1"
                  defaultValue={item?.quantity}
                  onChange={(e) => {
                    handleChangeQuantity(e, index)
                  }}
                />
                <p className="text-third"> {item?.price || 0} VND</p>
                <Trash2
                  className="cursor-pointer text-red-400"
                  onClick={() => {
                    handleDeleteMaterial(item?.materialID)
                  }}
                />
              </div>
            ))}
          </div>
          <CirclePlus
            className="mt-2 h-6 w-6 cursor-pointer text-black"
            onClick={() => {
              handleAddMaterial()
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateProduct

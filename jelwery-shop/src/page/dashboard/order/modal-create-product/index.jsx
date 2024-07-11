import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../component/ui/Modal'
import { Option, Select } from '@material-tailwind/react'
import { useUploadImage } from '../../../../hooks/useUploadImage'
import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import Button from '../../../../component/ui/Button'
import { toast } from 'sonner'
import { sendHttp } from '../../../../utils/send-http'
import productApi from '../../../../feature/product/productApi'
import requestApi from '../../../../feature/request/requestApi'
import { requestActions } from '../../../../feature/request/requestSlice'

function ModalCreateProduct({ open, handler, orderInfo }) {
  const dispatch = useDispatch()
  const { listCategory } = useSelector((state) => state.category)
  const { listMaterial } = useSelector((state) => state.material)
  const [materials, setMaterials] = useState([])
  const { hanldeUpload, imageUrl } = useUploadImage()
  const handleAddMaterial = () => {
    setMaterials((prev) => {
      const newMaterial = [...prev.map((item) => ({ ...item }))]
      newMaterial.push({ materialID: '', materialName: '', quantity: 1, price: 0 })
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.image = imageUrl
    data.designID = orderInfo.designID
    data.status = 'System'
    const productData = {
      product: {
        ...data,
      },
      materials,
    }

    const { resData } = await sendHttp(productApi.createProduct, productData)
    if (resData) {
      const requestData = {
        description: orderInfo?.description,
        status: orderInfo?.status,
        designID: orderInfo?.designID,
        productID: resData?.productID,
        image: orderInfo?.image,
        type: orderInfo?.type,
      }

      const { status } = await sendHttp(requestApi.updateRequest, requestData, orderInfo?.id)

      if (status) {
        dispatch(
          requestActions.updateProduct({ id: orderInfo?.id, productID: requestData?.productID }),
        )
        handler()
      }
    }
  }

  return (
    <Modal open={open} handler={handler}>
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h1 className="title mb-4">Create Product</h1>
            <Button type="primary" className="font-medium">
              Create
            </Button>
          </div>
          <div className="mb-2 flex gap-4">
            <div className="w-full">
              <label htmlFor="productName" className="block text-lg font-medium text-black">
                Product Name
              </label>
              <input type="text" name="productName" id="productName" className="input w-full" />
            </div>
            <div className="w-full">
              <label htmlFor="description" className="block text-lg font-medium text-black">
                Description
              </label>
              <input type="text" name="description" id="description" className="input w-full" />
            </div>
          </div>
          <label htmlFor="category" className="block text-lg font-medium text-black">
            Category
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <select
                id="category"
                name="categoryID"
                className="w-full rounded-md border-2 border-secondary px-2 py-3 text-black outline-none"
              >
                {listCategory.map(({ catID, catName }) => (
                  <option key={catID} value={catID}>
                    {catName}
                  </option>
                ))}
              </select>
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
        <div className="mt-2 text-black">
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

import { useSelector } from 'react-redux'
import Modal from '../../../../component/ui/Modal'

function ModalCreateProduct({ open, handler }) {
  const { listCategory } = useSelector((state) => state.category)
  return (
    <Modal open={open} handler={handler}>
      <div className="px-4 py-6">
        <h1 className="title mb-4">Create Product</h1>
        <form>
          <div className="flex gap-4">
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
          <select name="categoryID" id="category" className="w-full text-black">
            {listCategory.map(({ catID, catName }) => (
              <option value={catID}>{catName}</option>
            ))}
          </select>
        </form>
      </div>
    </Modal>
  )
}

export default ModalCreateProduct

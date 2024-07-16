import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { caculatePagination } from '../../../utils/calculatePagination'
import Table from './table'
import Button from '../../../component/ui/Button'
import ModalCreateProduct from './modal-create-product'
const TABLE_HEAD = ['ID', 'Image', 'Name', 'Date', 'Total', 'Action']
function ProductManager() {
  const dispatch = useDispatch()
  const { listProduct } = useSelector((state) => state.product)
  const [currentPage, setCurrentPage] = useState(0)
  const [tableData, setTableData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const listData = listProduct?.map(
    ({ productID, image, productName, createDate, processPrice, priceDesign, priceMaterial }) => ({
      productID,
      image,
      productName,
      date: new Date(createDate).toLocaleDateString(),
      total: processPrice + priceDesign + priceMaterial,
    }),
  )

  const perPage = 3
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  function handleOpenModal() {
    setOpenModal((prev) => !prev)
  }
  function handleSearch(e) {
    const searchVale = e.target.value
    let currentData = listData?.filter(({ productID }) => productID === Number(searchVale))

    if (currentData.length === 0 && searchVale !== '') {
      currentData = listData?.filter(({ productName }) => {
        if (productName) {
          return productName.includes(searchVale)
        }
      })
    }
    if (searchVale === '') {
      setTableData(listData)
      return
    }
    setTableData(currentData)
  }
  useEffect(() => {
    dispatch({ type: 'PRODUCT_LIST_SAGA' })
    dispatch({ type: 'GET_LIST_DESIGN_SAGA' })
    dispatch({ type: 'GET_ALL_CATEGORY_SAGA' })
    dispatch({ type: 'GET_LIST_MATERIAL_SAGA' })
  }, [])
  useEffect(() => {
    setTableData(listData)
  }, [JSON.stringify(listData), listData.length])
  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">Customer</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder={`Search product`}
            className="rounded-md border border-solid border-third px-4 py-2 outline-none"
            onChange={handleSearch}
          />
          <Button
            type="primary"
            onClick={() => {
              handleOpenModal()
            }}
          >
            Create Product
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={dataSlice} />
        {tableData.length === 0 && (
          <p className="mt-20 text-center text-xl font-medium text-third">Not Found</p>
        )}
      </div>

      <div className="absolute bottom-0 right-[50%] translate-x-1/2  pb-4">
        {tableData.length > 0 && (
          <Pagination
            itemLength={tableData.length}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <ModalCreateProduct open={openModal} handler={handleOpenModal} />
    </>
  )
}

export default ProductManager

import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import Table from './table'
import { caculatePagination } from '../../../utils/calculatePagination'
import { useDispatch, useSelector } from 'react-redux'
import { convertStatus } from '../../../utils/convertStatus'
const TABLE_HEAD = ['Id', 'Order', 'Date', 'Total', 'Status', 'Action']

function OrderManager() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { listRequest } = useSelector((state) => state.request)
  const { listProduct } = useSelector((state) => state.product)
  const [currentPage, setCurrentPage] = useState(0)
  const [tableData, setTableData] = useState([])
  const listData = listRequest?.map(({ id, createDate, description, status, productID }) => {
    const date = new Date(createDate)
    const { priceDesign, priceMaterial, processPrice } = listProduct?.find(
      (item) => item.productID === productID,
    )
    const total = priceDesign + priceMaterial + processPrice
    return { requestId: id, order: description, date: date.toLocaleDateString(), total, status }
  })

  const perPage = 3
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  function handleSearch(e) {
    const searchVale = e.target.value
    const currentData = listData.filter(
      ({ requestId, status }) => requestId === Number(searchVale) || status === searchVale,
    )
    if (searchVale === '') {
      setTableData(listData)
      return
    }
    setTableData(currentData)
  }
  useEffect(() => {
    if (listProduct.length === 0) dispatch({ type: 'PRODUCT_LIST_SAGA' })
    if (currentUser?.roleID === 2 || currentUser?.roleID === 1) {
      dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
    } else {
      const status = convertStatus(currentUser?.roleID)
      dispatch({
        type: 'GET_REQUEST_BY_STATUS',
        payload: { status, role: currentUser?.roleID },
      })
    }
  }, [])
  useEffect(() => {
    setTableData(listData)
  }, [listData])
  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">Orders</h2>
        <input
          type="text"
          placeholder={`Search order`}
          className="rounded-md border border-solid border-third px-4 py-2 outline-none"
          onChange={handleSearch}
        />
      </div>
      <div className="mt-4">
        <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={dataSlice} />
      </div>

      <div className="absolute bottom-0 right-[50%] translate-x-1/2  pb-4">
        <Pagination
          itemLength={tableData.length}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}
export default OrderManager

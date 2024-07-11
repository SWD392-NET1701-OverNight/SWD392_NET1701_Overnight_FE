import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import Table from './table'
import { caculatePagination } from '../../../utils/calculatePagination'
import { useDispatch, useSelector } from 'react-redux'
import { convertStatus } from '../../../utils/convertStatus'
import { getToken } from '../../../utils/auth'
import { jwtDecode } from 'jwt-decode'
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
    const product = listProduct?.find((item) => {
      return item.productID === productID
    })
    const total = product?.priceDesign + product?.priceMaterial + product?.processPrice
    return { requestId: id, order: description, date: date.toLocaleDateString(), total, status }
  })

  const perPage = 3
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  function handleSearch(e) {
    const searchVale = e.target.value
    let currentData = listData.filter(({ requestId }) => requestId === Number(searchVale))

    if (currentData.length === 0 && searchVale !== '') {
      currentData = listData.filter(({ status }) => {
        if (status) {
          return status.includes(searchVale)
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
  }, [currentUser?.roleID])
  useEffect(() => {
    if (getToken()) {
      const { userId } = jwtDecode(getToken())
      dispatch({ type: 'GET_USER_BY_ID_SAGA', payload: userId })
    }
    dispatch({ type: 'GET_LIST_DESIGN_SAGA' })
    dispatch({ type: 'GET_LIST_MATERIAL_SAGA' })
    dispatch({ type: 'GET_ALL_CATEGORY_SAGA' })
  }, [])
  useEffect(() => {
    setTableData(listData)
  }, [JSON.stringify(listData), listData.length])
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
    </>
  )
}
export default OrderManager

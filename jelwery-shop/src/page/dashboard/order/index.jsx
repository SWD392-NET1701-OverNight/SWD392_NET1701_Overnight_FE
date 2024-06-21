import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import Table from './table'
import { caculatePagination } from '../../../utils/calculatePagination'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import requestApi from '../../../feature/request/requestApi'
import { requestAction } from '../../../feature/request/requestSlice'
import { sendHttp } from '../../../utils/send-http'
import { getToken } from '../../../utils/auth'
import { authAction } from '../../../feature/auth/authSlice'
import { convertStatus } from '../../../utils/convertStatus'
const TABLE_HEAD = ['Id', 'Order', 'Date', 'Total', 'Status', 'Action']
const TABLE_BODY = [
  { id: 1, order: 'Order 1', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 2, order: 'Order 2', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
]

function OrderManager() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { listRequest } = useSelector((state) => state.request)
  const { listProduct } = useSelector((state) => state.product)
  const [currentPage, setCurrentPage] = useState(0)
  const tableData = listRequest?.map(({ id, createDate, description, status, productID }) => {
    const date = new Date(createDate)
    const { priceDesign, priceMaterial, processPrice } = listProduct?.find(
      (item) => item.productID === productID,
    )
    const total = priceDesign + priceMaterial + processPrice
    return { id, order: description, date: date.toLocaleDateString(), total, status }
  })
  async function handleUpdateStatus(id, statusChange) {
    let statusUpdate = statusChange
    if (currentUser?.roleID === 2 && statusChange === 'Approve') {
      statusUpdate = 'In-Production'
    } else if (currentUser?.roleID === 3 && statusChange === 'Approve') {
      statusUpdate = 'Pending'
    } else if (currentUser?.roleID === 4 && statusChange === 'Approve') {
      statusUpdate = 'Done'
    }
    const { status } = await sendHttp(requestApi.acceptRequest, statusUpdate, id, {
      success: 'Update success',
      error: 'Update fail',
    })
    if (status === 'success') dispatch(requestAction.updateStatus({ id, status: statusUpdate }))
  }
  const tableActions = [
    {
      name: 'Approve',
      callback: handleUpdateStatus,
    },
    {
      name: 'Cancel',
      callback: handleUpdateStatus,
    },
  ]
  const perPage = 3
  const currentData = caculatePagination(perPage, currentPage, tableData)

  useEffect(() => {
    if (listProduct.length === 0) dispatch({ type: 'PRODUCT_LIST_SAGA' })
    const status = convertStatus(currentUser?.roleID)
    if (currentUser?.roleID === 2) {
      dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
    } else {
      dispatch({
        type: 'GET_REQUEST_BY_STATUS',
        payload: { status, role: currentUser?.roleID },
      })
    }
  }, [listProduct.length === 0])

  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">Orders</h2>
        <input
          type="text"
          placeholder={`Search orders`}
          className="rounded-md border border-solid border-third px-4 py-2 outline-none"
        />
      </div>
      <div className="mt-4">
        <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={currentData} tableActions={tableActions} />
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

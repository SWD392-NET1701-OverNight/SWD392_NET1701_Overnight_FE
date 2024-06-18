import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import Table from '../../../component/ui/Table'
import { caculatePagination } from '../../../utils/calculatePagination'

import { useDispatch, useSelector } from 'react-redux'
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

function OrderManager({ currentTab }) {
  const dispatch = useDispatch()
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

  const perPage = 6
  const currentData = caculatePagination(perPage, currentPage, tableData)

  useEffect(() => {
    if (listProduct.length === 0) dispatch({ type: 'PRODUCT_LIST_SAGA' })
    dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
  }, [])
  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">{currentTab}</h2>
        <input
          type="text"
          placeholder={`Search ${currentTab.toLowerCase()}`}
          className="rounded-md border border-solid border-third px-4 py-2 outline-none"
        />
      </div>
      <div className="mt-4">
        <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={currentData}></Table>
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

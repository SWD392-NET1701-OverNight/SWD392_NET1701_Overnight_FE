import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../component/ui/Button'
import Pagination from '../../../component/ui/Pagination'
import { caculatePagination } from '../../../utils/calculatePagination'
import Table from './table'
import { useEffect, useState } from 'react'

const TABLE_HEAD = ['TransactionID', 'Description', 'Price', 'Date']

function MyTransaction() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { transactionDetail } = useSelector((state) => state.transaction)
  const [currentPage, setCurrentPage] = useState(0)
  const [tableData, setTableData] = useState([])
  const listData = transactionDetail.map(({ transactionID, description, amount, createdDate }) => ({
    transactionID,
    description,
    amount,
    createdDate: new Date(createdDate).toLocaleDateString(),
  }))
  const perPage = 3
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  function handleSearch(e) {
    const searchVale = e.target.value
    let currentData = listData.filter(({ transactionID }) => transactionID === Number(searchVale))

    if (currentData.length === 0 && searchVale !== '') {
      currentData = listData.filter(({ description }) => {
        if (description) {
          return description.includes(searchVale)
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
    dispatch({ type: 'GET_DETAIL_TRANSACTION', payload: currentUser.userID })
  }, [])
  useEffect(() => {
    setTableData(listData)
  }, [JSON.stringify(listData)])
  return (
    <>
      <input
        type="text"
        placeholder={`Search transaction`}
        className="float-right mt-[-100px] rounded-md border border-solid border-third px-4 py-2 outline-none"
        onChange={handleSearch}
      />

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

export default MyTransaction

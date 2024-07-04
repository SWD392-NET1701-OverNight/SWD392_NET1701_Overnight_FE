import { useEffect, useState } from 'react'
import Pagination from '../../../component/ui/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { caculatePagination } from '../../../utils/calculatePagination'
import Table from './table'
import Button from '../../../component/ui/Button'
import ModalCreateUser from './modal-create'

const TABLE_HEAD = ['ID', 'Email', 'FullName', 'Address', 'Phone', 'Date', 'Action']

function CustomerManager() {
  const dispatch = useDispatch()
  const { listUser } = useSelector((state) => state.auth)
  const [currentPage, setCurrentPage] = useState(0)
  const [tableData, setTableData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const listCustomers = listUser?.filter(({ roleID }) => roleID === 6)
  const listData = listCustomers?.map(
    ({ userID, email, fullName, address, phoneNum, createDate }) => ({
      userID,
      email,
      fullName,
      address,
      phoneNum,
      date: new Date(createDate).toLocaleDateString(),
    }),
  )
  function handleOpenModal() {
    setOpenModal((prev) => !prev)
  }
  const perPage = 3
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  function handleSearch(e) {
    const searchVale = e.target.value
    let currentData = listData.filter(({ userID }) => userID.includes(searchVale))

    if (currentData.length === 0 && searchVale !== '') {
      currentData = listData.filter(({ fullName }) => {
        if (fullName) {
          return fullName.includes(searchVale)
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
    dispatch({ type: 'GET_ALL_USER_SAGA' })
  }, [])
  useEffect(() => {
    setTableData(listData)
  }, [JSON.stringify(listData)])
  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">Customer</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder={`Search customer`}
            className="rounded-md border border-solid border-third px-4 py-2 outline-none"
            onChange={handleSearch}
          />
          <Button
            type="primary"
            onClick={() => {
              handleOpenModal()
            }}
          >
            Create User
          </Button>
        </div>
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
      <ModalCreateUser handler={handleOpenModal} open={openModal} />
    </>
  )
}
export default CustomerManager

import { useDispatch, useSelector } from 'react-redux'
import { caculatePagination } from '../../../utils/calculatePagination'
import { useEffect, useState } from 'react'
import Button from '../../../component/ui/Button'
import Table from './table'
import Pagination from '../../../component/ui/Pagination'
import ModalCreateCategory from './modal-create-category'

const TABLE_HEAD = ['ID', 'Name', 'Description', 'Action']
function CategoryManager() {
  const { listCategory } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [tableData, setTableData] = useState([])
  const listData = listCategory?.map(({ catID, catName, description }) => ({
    catID,
    catName,
    description,
  }))
  function handleSearch(e) {
    const searchVale = e.target.value
    let currentData = listData.filter(({ catID }) => catID === Number(searchVale))

    if (currentData.length === 0 && searchVale !== '') {
      currentData = listData.filter(({ catName }) => {
        if (catName) {
          return catName.includes(searchVale)
        }
      })
    }
    if (searchVale === '') {
      setTableData(listData)
      return
    }
    setTableData(currentData)
  }
  const perPage = 5
  const dataSlice = caculatePagination(perPage, currentPage, tableData)
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev)
  }
  useEffect(() => {
    if (listData.length > 0) {
      setTableData(listData)
      return
    }
    dispatch({ type: 'GET_ALL_CATEGORY_SAGA' })
  }, [JSON.stringify(listCategory), listData.length])
  return (
    <>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">Category</h2>
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
            Create Category
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
      <ModalCreateCategory open={openModal} handler={handleOpenModal} />
    </>
  )
}

export default CategoryManager

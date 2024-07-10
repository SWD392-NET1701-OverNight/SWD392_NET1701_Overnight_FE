import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import ModalUpateCategory from '../modal-update-category'
import ModalDeleteCategory from '../model-delete-category'

function TableAction({ category }) {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenCreateModal = () => {
    setOpenCreateModal((prev) => !prev)
  }
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev)
  }
  return (
    <>
      <Menu>
        <MenuHandler>
          <Ellipsis />
        </MenuHandler>
        <MenuList>
          <MenuItem
            onClick={() => {
              handleOpenCreateModal()
            }}
            className="text-center text-black"
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleOpenDeleteModal()
            }}
            className="text-center text-black"
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalUpateCategory
        open={openCreateModal}
        handler={handleOpenCreateModal}
        category={category}
      />
      <ModalDeleteCategory open={openDeleteModal} handler={handleOpenDeleteModal} catID={category?.catID}/>
    </>
  )
}

export default TableAction

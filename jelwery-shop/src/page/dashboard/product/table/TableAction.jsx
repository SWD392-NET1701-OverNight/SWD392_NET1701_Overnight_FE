import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { Ellipsis } from 'lucide-react'

import { useState } from 'react'
import ModalUpdateProduct from '../modal-update-product'

function TableAction({ productId }) {
  const [open, setOpen] = useState(false)
  const handler = () => {
    setOpen((prev) => !prev)
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
              handler()
            }}
            className="text-center text-black"
          >
            Update
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalUpdateProduct open={open} handler={handler} productId={productId}/>
    </>
  )
}

export default TableAction

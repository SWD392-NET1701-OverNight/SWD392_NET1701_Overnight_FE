import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { Ellipsis } from 'lucide-react'
import ModalUpdateUser from '../mode-update'
import { useState } from 'react'

function TableAction({ customer }) {
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
      <ModalUpdateUser customer={customer} open={open} handler={handler} />
    </>
  )
}

export default TableAction

import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { Ellipsis } from 'lucide-react'

function TableAction() {
  return (
    <>
      <Menu>
        <MenuHandler>
          <Ellipsis />
        </MenuHandler>
        <MenuList>
          <MenuItem>Update</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default TableAction

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
function TableAction({ actions, rowId }) {
  return (
    <Menu>
      <MenuHandler>
        <FontAwesomeIcon icon={faEllipsis} />
      </MenuHandler>
      <MenuList>
        {actions.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.callback(rowId, item.name)
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default TableAction

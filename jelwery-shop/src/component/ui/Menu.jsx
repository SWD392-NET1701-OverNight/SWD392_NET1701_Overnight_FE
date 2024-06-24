import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

function MenuCustome({ items, children, ...rest }) {
  return (
    <Menu>
      <MenuHandler>{children}</MenuHandler>
      <MenuList>
        {items.map((item, index) => (
          <MenuItem key={index} {...rest}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default MenuCustome

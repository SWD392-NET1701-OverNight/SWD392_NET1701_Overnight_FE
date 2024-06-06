import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { LogOut, ShoppingBag, UserRound } from 'lucide-react'
function SideBar({ onClick }) {
  const sidebarItems = [
    { title: 'My Orders', icon: <ShoppingBag /> },
    { title: 'My Profile', icon: <UserRound /> },
    { title: 'Sign Out', icon: <LogOut /> },
  ]
  return (
    <>
      <Card className="rounded-none shadow-none">
        <List className="gap-0 p-0">
          {sidebarItems.map((item, index) => (
            <ListItem
              className="rounded-none"
              key={index}
              onClick={() => {
                onClick(item.title)
              }}
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.title}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  )
}

export default SideBar

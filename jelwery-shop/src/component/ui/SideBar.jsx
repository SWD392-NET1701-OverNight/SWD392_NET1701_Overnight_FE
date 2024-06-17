import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react'

function SideBar({ onCurrentTab, currentTab, sidebarItems }) {
  return (
    <>
      <Card className="rounded-none shadow-none">
        <List className="gap-0 p-0">
          {sidebarItems.map((item, index) => {
            return (
              <ListItem
                className={`rounded-none ${currentTab === item.title ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}
                key={index}
                onClick={() => {
                  onCurrentTab(item.title)
                }}
              >
                <ListItemPrefix>{item.icon}</ListItemPrefix>
                <div className="text-base font-medium">{item.title}</div>
              </ListItem>
            )
          })}
        </List>
      </Card>
    </>
  )
}

export default SideBar

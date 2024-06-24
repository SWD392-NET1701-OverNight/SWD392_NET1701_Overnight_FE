import { LogOut, UserRound,BookMinus,ShoppingCart } from 'lucide-react'
import { LogOut, Package, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../component/ui/SideBar'
import { useLogout } from '../../hooks/useLogout'
const sidebarItems = [
  { title: 'Statistics', icon: <UserRound /> },
  { title: 'Products', icon: <UserRound /> },
  { title: 'Categories', icon: <BookMinus /> },
  { title: 'Orders', icon: <ShoppingCart /> },
  { title: 'Customers', icon: <UserRound /> },
]
function DashBoardLayout() {
  const { handleLogOut } = useLogout()
  const [currentTab, setCurrentTab] = useState('Orders')
  return (
    <div className="flex h-[100vh]">
      <div className="border-r-2 px-8  text-center">
        <div className="title py-[6vh]">Dashboard</div>
        <SideBar sidebarItems={sidebarItems} currentTab={currentTab} onCurrentTab={setCurrentTab} />
      </div>
      <div className="w-full bg-fourth px-8">
        <div className="flex justify-end py-[6vh] ">
          <button
            onClick={() => {
              handleLogOut()
            }}
            className="hover:opacity-45"
          >
            <LogOut />
          </button>
        </div>
        <div value={currentTab} className="relative h-[80vh] rounded-md bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default DashBoardLayout

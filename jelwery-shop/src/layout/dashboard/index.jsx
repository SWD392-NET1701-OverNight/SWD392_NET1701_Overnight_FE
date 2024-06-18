import { LogOut, Package, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react'
import SideBar from '../../component/ui/SideBar'
import { useLogout } from '../../hooks/useLogout'
const sidebarItems = [
  { title: 'Orders', icon: <ShoppingCart /> },
  { title: 'Categories', icon: <Package /> },
  { title: 'Products', icon: <ShoppingBag /> },
  { title: 'Customers', icon: <UserRound /> },
]

function DashBoardLayout({ currentTab, setCurrentTab, children }) {
  const { handleLogOut } = useLogout()
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
        <div className="relative h-[80vh] rounded-md bg-white">{children}</div>
      </div>
    </div>
  )
}
export default DashBoardLayout

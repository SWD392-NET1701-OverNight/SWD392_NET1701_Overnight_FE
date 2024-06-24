import { LogOut, UserRound,BookMinus,ShoppingCart } from 'lucide-react'
import SideBar from '../../component/ui/SideBar'
const sidebarItems = [
  { title: 'Statistics', icon: <UserRound /> },
  { title: 'Products', icon: <UserRound /> },
  { title: 'Categories', icon: <BookMinus /> },
  { title: 'Orders', icon: <ShoppingCart /> },
  { title: 'Customers', icon: <UserRound /> },
]

function DashBoardLayout({ currentTab, setCurrentTab, children }) {
  return (
    <div className="flex h-[100vh]">
      <div className="border-r-2 px-8  text-center">
        <div className="title py-[6vh]">Dashboard</div>
        <SideBar sidebarItems={sidebarItems} currentTab={currentTab} onCurrentTab={setCurrentTab} />
      </div>
      <div className="w-full bg-fourth px-8">
        <div className="flex justify-end py-[6vh] ">
          <LogOut />
        </div>
        <div value={{ currentTab }} className="bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}
export default DashBoardLayout

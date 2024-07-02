import { useEffect, useState } from 'react'
import HeadingSection from '../../component/ui/HeadingSection'
import SideBar from '../../component/ui/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import MyOrder from './my-order'
import MyProfile from './my-profile'
import { LogOut, ShoppingBag, UserRound } from 'lucide-react'
import { useLogout } from '../../hooks'
const sidebarItems = [
  { title: 'My Orders', icon: <ShoppingBag /> },
  { title: 'My Profile', icon: <UserRound /> },
  { title: 'Sign Out', icon: <LogOut /> },
]
function MyAccount() {
  const { currentUser, isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { handleLogOut } = useLogout()
  const [currentTab, setCurrentTab] = useState('My Orders')
  function handleClickTab(tab, link = null) {
    setCurrentTab(tab)
  }
  useEffect(() => {
    if (!currentUser.email && isAuth) {
      dispatch({ type: 'GET_USER_BY_ID_SAGA', payload: currentUser.userID })
    }
  }, [currentUser.email, isAuth])
  useEffect(() => {
    if (currentTab === 'Sign Out' && isAuth) {
      handleLogOut()
    }
  }, [currentTab, handleLogOut])

  return (
    <div className="flex gap-8 px-[14%] pt-[50px]">
      <div className="w-1/3 pr-8">
        <HeadingSection title={`Hello ${currentUser?.fullName}`} />
        <p className="mt-2 text-third">Welcome to your Account</p>
        <aside className="mt-[30px]">
          <SideBar onSetTab={handleClickTab} currentTab={currentTab} sidebarItems={sidebarItems} />
        </aside>
      </div>
      <div className="w-2/3">
        <h2 className="title">{currentTab}</h2>
        <div className="mt-[64px]">
          {currentTab === 'My Orders' && <MyOrder />}
          {currentTab === 'My Profile' && <MyProfile />}
        </div>
      </div>
    </div>
  )
}

export default MyAccount

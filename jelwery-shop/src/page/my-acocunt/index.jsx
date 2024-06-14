import { useState } from 'react'
import HeadingSection from '../../component/ui/HeadingSection'
import SideBar from './sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../feature/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import MyOrder from './my-order'

function MyAccount() {
  const navigator = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState('My Orders')
  function handleClickCurrentTab(tab) {
    setCurrentTab(tab)
  }
  if (currentTab === 'Sign Out') {
    dispatch(authAction.logout())
    setTimeout(() => {
      navigator('/')
    }, 1000)
  }
  return (
    <div className="flex gap-8 px-[14%] pt-[50px]">
      <div className="w-1/3 pr-8">
        <HeadingSection title={`Hello ${currentUser.userName}`} />
        <p className="mt-2 text-third">Welcome to your Account</p>
        <aside className="mt-[30px]">
          <SideBar onClick={handleClickCurrentTab} />
        </aside>
      </div>
      <div className="w-2/3">
        <h2 className="title">{currentTab}</h2>
        <div className="mt-[64px]">{currentTab === 'My Orders' && <MyOrder />}</div>
      </div>
    </div>
  )
}

export default MyAccount

import { useState } from 'react'
import HeadingSection from '../../component/ui/HeadingSection'
import SideBar from './sidebar/SideBar'
import HeadingOrderCard from './HeadingOrderCard'
import ParagraphOrderCard from './ParagraphOrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../feature/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function MyAccount() {
  const { listRequestById } = useSelector((state) => state.request)
  const navigator = useNavigate();
  const {isAuth} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('')
  function handleClickCurrentTab(tab) {
    setCurrentTab(tab)
  }
  if(currentTab === 'Sign Out') {
dispatch(authAction.logout())  }
if(!isAuth ) {
  navigator('/')
}
  return (
    <div className="flex gap-8 px-[14%] pt-[50px]">
      <div className="w-1/3">
        <HeadingSection title={`Hello `} />
        <p className="mt-2 text-third">Welcome to your Account</p>
        <aside className="mt-[30px]">
          <SideBar onClick={handleClickCurrentTab} />
        </aside>
      </div>
      <div className="h-[100vh] w-2/3 overflow-y-scroll">
        <h2 className="title">{currentTab}</h2>
        <div className="mt-[64px] space-y-10 ">
          {listRequestById.map((item, index) => (
            <>
              <div className="space-y-2 bg-fourth px-[8%] py-4">
                <HeadingOrderCard title="Order no:" />
                <ParagraphOrderCard title="Order Date" value="12" />
              </div>
              <div className="flex h-[175px] items-center gap-6">
                <img
                  src="https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5lY2tsYWNlfGVufDB8fDB8fHww"
                  alt="jewelry"
                  className="image w-[140px] rounded-lg"
                />
                <div className="flex h-full flex-col justify-between">
                  <HeadingOrderCard title="Product Name" />
                  <ParagraphOrderCard title="Catogory" value="Necklace" />
                  <ParagraphOrderCard title="Total" value="22.00" />
                </div>
              </div>
              <div className="h-2 w-full rounded-lg bg-fourth"></div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAccount

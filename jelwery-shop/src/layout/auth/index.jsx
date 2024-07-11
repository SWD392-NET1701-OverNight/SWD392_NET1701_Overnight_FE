import { Outlet, useNavigate } from 'react-router-dom'
import AuthImg from '/assets/image/background.jpg'
import { getToken } from '../../utils/auth'
import { useEffect } from 'react'
function AuthLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    if (getToken()) {
      navigate('/')
    }
  }, [])
  return (
    <main className=" flex h-screen w-full">
      <div className="flex-1">
        <img src={AuthImg} className="image h-full w-full" />
      </div>
      <div className="flex-1">
        <div className="px-10 pt-14">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default AuthLayout

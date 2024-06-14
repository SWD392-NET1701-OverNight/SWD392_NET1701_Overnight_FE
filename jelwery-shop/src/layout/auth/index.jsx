import { Outlet } from 'react-router-dom'
import AuthImg from '/assets/image/background.jpg'
function AuthLayout() {
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

import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <main className=" flex h-screen w-full">
      <div className="flex-1">
        <img
          src="https://i.pinimg.com/736x/cc/5e/6f/cc5e6f202869201ce6ff13277bc579f7.jpg"
          className="h-full w-full object-cover object-top"
        />
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

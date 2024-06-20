import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { getToken } from '../../utils/auth'
import { useDispatch } from 'react-redux'
import { authAction } from '../../feature/auth/authSlice'
import { jwtDecode } from 'jwt-decode'

function RootLayout() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (getToken()) {
      const userInfor = jwtDecode(getToken())
      dispatch(authAction.login({ ...userInfor, userID: userInfor.userId }))
    }
  }, [getToken()])
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout

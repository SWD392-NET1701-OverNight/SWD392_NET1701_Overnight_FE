import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { getToken } from '../../utils/auth'
import { authAction } from '../../feature/auth/authSlice'
import { useDispatch } from 'react-redux'

function RootLayout() {
  const dispatch = useDispatch()
  if (getToken()) {
    dispatch(authAction.login())
  }
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

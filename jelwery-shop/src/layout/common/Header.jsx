import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { User } from 'lucide-react'
import { Dropdown } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../feature/auth/authSlice'
import LogoImg from '/assets/image/logo.jpg'
const navItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
]
const styleDrodown = {
  textAlign: 'center',
  color: '#807D7E',
  fontFamily: 'Inter',
  minWidth: '100px',
}

function Header() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)
  function handleLogout() {
    dispatch(authAction.logout())
  }
  const items = [
    {
      key: '1',
      label: <Link to="/profile">Profile</Link>,
    },
    { type: 'divider' },
    {
      key: '2',
      label: <button onClick={handleLogout}>Logout</button>,
    },
  ]
  return (
    <header className="border border-b-2 border-[#f6f6f6] px-[14%] py-4">
      <nav className="flex items-center">
        <img src={LogoImg} alt="logo" className="image w-[8%]" />
        <ul className="flex flex-1 space-x-6 pl-6 text-xl text-third">
          {navItems.map(({ name, url }, index) => (
            <li key={index} className="hover:font-semibold hover:text-secondary">
              <NavLink
                to={url}
                className={({ isActive }) => (isActive ? 'font-semibold text-secondary' : '')}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`flex w-[22%] ${isAuth ? 'justify-center' : 'justify-between'}`}>
          {!isAuth ? (
            <>
              <button className="btn bg-primary text-white">
                <Link to="/auth">Sign In</Link>
              </button>
              <button className="btn border-1 border border-secondary text-primary">
                <Link to="/auth/register">Sign Up</Link>
              </button>
            </>
          ) : (
            <Dropdown
              menu={{
                items,
                style: styleDrodown,
              }}
              placement="bottom"
              trigger={['click']}
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                <div className="flex rounded-md bg-fourth px-2 py-2 text-third">
                  <User className="text-sm" />
                </div>
              </a>
            </Dropdown>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

import React from 'react'
import { Form, Link, NavLink } from 'react-router-dom'
import { getToken } from '../../utils/auth'
import { User } from 'lucide-react'
import { Dropdown, Space } from 'antd'

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
]
const items = [
  {
    key: '1',
    label: <Link to="/profile">Profile</Link>,
  },
  { type: 'divider' },
  {
    key: '2',
    label: (
      <Form action="/auth/logout">
        <button>Logout</button>
      </Form>
    ),
  },
]
function Header() {
  const isAuth = getToken()

  return (
    <header className="border border-b-2 border-[#f6f6f6] px-[6%] py-6">
      <nav className="flex items-center">
        <div className="w-[14%]">Logo</div>
        <ul className="text-third flex flex-1 space-x-6 pl-6 text-lg">
          {navItems.map(({ name, url }, index) => (
            <li key={index}>
              <NavLink
                to={url}
                className={({ isActive }) => (isActive ? 'font-semibold text-secondary' : '')}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`flex w-[17%] ${isAuth ? 'justify-center' : 'justify-between'}`}>
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
              }}
              placement="bottom"
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                <div className="text-third flex rounded-md bg-small px-2 py-2">
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

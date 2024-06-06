import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { User } from 'lucide-react'
import { useSelector } from 'react-redux'
import LogoImg from '/assets/image/logo.jpg'
import Button from '../../component/ui/Button'
const navItems = [
  { name: 'Home', url: '/' },
  { name: 'Shop', url: 'product-list' },
  { name: 'About', url: 'about' },
]

function Header() {
  const { isAuth } = useSelector((state) => state.auth)

  return (
    <header className="border border-b-2 border-[#f6f6f6] px-[14%] py-4">
      <nav className="flex items-center">
        <img src={LogoImg} alt="logo" className="image hidden w-[8%] md:block" />
        <ul className="hidden flex-1 space-x-6 pl-6 text-xl text-third md:flex">
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
        <div className={`flex gap-2 ${isAuth ? 'justify-center' : 'justify-between'}`}>
          {!isAuth ? (
            <>
              <Button type="primary">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button type="secondary">
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <NavLink
              to="my-account"
              className={({ isActive }) => {
                let styleCss = 'rounded-md px-2 py-2 '
                if (isActive) {
                  styleCss += 'bg-primary text-white'
                } else {
                  styleCss += 'bg-fourth text-third'
                }
                return styleCss
              }}
            >
              <User className="text-sm" />
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

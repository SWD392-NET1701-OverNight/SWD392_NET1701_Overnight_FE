import React, { useState } from 'react'
import Input from '../component/ui/Input'
import { sendHttp } from '../utils/send-http'
import authAPI from '../feature/auth/authApi'
import { Link } from 'react-router-dom'
import ContainerAuth from './components/ContainerAuth'
import Button from '../component/ui/Button'

function ForgetPassword() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  async function handleSubmit(e) {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))

    if (!isVisible) {
      const check = await sendHttp(authAPI.confirmEmail, data.email)
      if (check.status === 'success') {
        toggleVisibility()
      }
      return
    }
    const check = await sendHttp(authAPI.resetPassword, data)
  }

  return (
    <ContainerAuth title="Reset Your Password ">
      <p className="link text-[#666]">
        Enter your email and we'll send you a OTP to reset your password.
      </p>
      <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input label="Email" id="email" name="email" type="email" />
        {isVisible && (
          <>
            <Input label="OTP" id="OTP" name="otp" type="text" />
            <Input label="New Password" id="password" name="password" type="password" />
          </>
        )}
        <div>
          <Button type="primary">{!isVisible ? 'Send reset OTP' : 'Reset Password'}</Button>
        </div>
      </form>

      <p className="p-link mt-2">
        Back to
        <Link to=".." className="ml-2 underline">
          Login
        </Link>
      </p>
    </ContainerAuth>
  )
}

export default ForgetPassword

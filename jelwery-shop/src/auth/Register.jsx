import { Link } from 'react-router-dom'
import Input from '../component/ui/Input'
import ContainerAuth from './components/ContainerAuth'
import authAPI from '../feature/auth/authApi'
import { sendHttp } from '../utils/send-http'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schema'
import ErrorInput from '../component/ui/ErrorInput'

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit = async (data) => {
    const { status } = await sendHttp(authAPI.signIn, data, null, {
      success: 'Register success',
      error: 'Register failed',
    })
    if (status === 'success') {
      reset()
    }
  }
  return (
    <>
      <ContainerAuth title="Sign Up">
        <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Username" id="username" {...register('username')} />
          {errors.username?.message && <ErrorInput>{errors.username?.message}</ErrorInput>}
          <Input label="Password" id="password" {...register('password')} type="password" />
          {errors.password?.message && <ErrorInput>{errors.password?.message}</ErrorInput>}
          <Input label="Full Name" id="fullName" {...register('fullName')} />
          {errors.fullName?.message && <ErrorInput>{errors.fullName?.message}</ErrorInput>}
          <Input label="Phone" id="phoneNum" {...register('phoneNum')} />
          {errors.phoneNum?.message && <ErrorInput>{errors.phoneNum?.message}</ErrorInput>}
          <Input label="Address" id="address" {...register('address')} />
          {errors.address?.message && <ErrorInput>{errors.address?.message}</ErrorInput>}
          <Input label="Email" id="email" {...register('email')} type="email" />
          {errors.email?.message && <ErrorInput>{errors.email?.message}</ErrorInput>}
          <div>
            <button className="btn mt-4 bg-primary text-white hover:opacity-70 active:opacity-100">
              Sign Up
            </button>
          </div>
        </form>
        <p className="p-link mt-2">
          Already have an account?
          <Link to=".." className="ml-2 underline">
            Login
          </Link>
        </p>
      </ContainerAuth>
    </>
  )
}

export default Register

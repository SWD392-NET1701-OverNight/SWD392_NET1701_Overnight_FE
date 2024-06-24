import Input from '../component/ui/Input'
import { Link, useNavigate } from 'react-router-dom'
import ContainerAuth from './components/ContainerAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schema/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
function Login() {
  const { isAuth, currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data) => {
    dispatch({ type: 'LOGIN_SAGA', payload: data })
  }
  useEffect(() => {
    if (isAuth) {
      setTimeout(() => {
        if (currentUser.role === 6) {
          navigate('/')
        } else {
          navigate('/dashboard')
        }
      }, 1200)
    }
  }, [isAuth])
  return (
    <>
      <ContainerAuth title="Sign In Page">
        <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Username" id="username" {...register('username')} />
          {errors.username?.message && <span>{errors.username?.message}</span>}
          <Input label="Password" id="password" {...register('password')} type="password" />
          {errors.password?.message && <span>{errors.password?.message}</span>}
          <div className="text-right">
            <Link to="forget-password" className="p-link underline">
              Forget Password
            </Link>
          </div>
          <div>
            <button className="btn bg-primary text-white hover:opacity-70 active:opacity-100">
              Sign In
            </button>
          </div>
        </form>
        <p className="p-link mt-2">
          Don't have an account ?
          <Link to="register" className="ml-2 underline">
            Sign Up
          </Link>
        </p>

        <Link to="../" className=" p-link mt-2 underline">
          Go to Home Page
        </Link>
      </ContainerAuth>
    </>
  )
}

export default Login

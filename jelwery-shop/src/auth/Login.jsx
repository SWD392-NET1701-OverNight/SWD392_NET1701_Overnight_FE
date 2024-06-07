import Input from '../component/ui/Input'
import { Link, useNavigate } from 'react-router-dom'
import ContainerAuth from './components/ContainerAuth'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const fomrData = new FormData(e.target)
    const data = Object.fromEntries(fomrData)
    dispatch({ type: 'LOGIN_SAGA', payload: data })
  }
  if (isAuth) navigate('/')
  return (
    <>
      <ContainerAuth title="Sign In Page">
        <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input label="Username" id="username" type="text" />
          <Input label="Password" id="password" type="password" />
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

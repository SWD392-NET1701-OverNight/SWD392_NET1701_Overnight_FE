import { Link } from 'react-router-dom'
import Input from '../component/ui/Input'
import ContainerAuth from './components/ContainerAuth'
import { toast } from 'sonner'
import axiosClient from '../api/axiosClient'
function Register() {
  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    try {
      const resData = await axiosClient.post('/api/Users/register', data)
      console.log(resData)
      if (resData.status === 400) {
        toast.error('Register failed')
        return
      }
      toast.success('Register success')
      e.target.reset()
    } catch (error) {
      toast.error('Register failed')
    }
  }
  return (
    <>
      <ContainerAuth title="Sign Up">
        <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input label="Username" id="username" type="text" />
          <Input label="Password" id="password" type="password" />
          <Input label="Full Name" id="fullName" type="text" />
          <Input label="Phone" id="phoneNum" type="text" />
          <Input label="Address" id="address" type="text" />
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

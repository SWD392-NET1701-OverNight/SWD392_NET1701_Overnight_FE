import { useForm } from 'react-hook-form'
import Button from '../../../component/ui/Button'
import Input from '../../../component/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { sendHttp } from '../../../utils/send-http'
import { authAction } from '../../../feature/auth/authSlice'
import authAPI from '../../../feature/auth/authApi'
function MyProfile() {
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phoneNum: currentUser.phoneNum,
      address: currentUser.address,
    },
  })
  const onSubmit = async (data) => {
    const { status } = await sendHttp(authAPI.updateUser, data, currentUser.userID, {
      success: 'Update user success',
      error: 'Update user failed',
    })
    if (status === 'success') {
      dispatch(authAction.updateUser(data))
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Your Name" id="name" {...register('fullName')} />
      <Input label="Your Name" id="name" {...register('email')} />
      <Input label="Your Name" id="name" {...register('phoneNum')} />
      <Input label="Your Name" id="name" {...register('address')} />
      <div>
        <Button className="mt-8 bg-fourth text-third">Change</Button>
      </div>
    </form>
  )
}

export default MyProfile

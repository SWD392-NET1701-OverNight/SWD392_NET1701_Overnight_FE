import { useForm } from 'react-hook-form'
import Button from '../../../component/ui/Button'
import Input from '../../../component/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { sendHttp } from '../../../utils/send-http'
import { authAction } from '../../../feature/auth/authSlice'
import authAPI from '../../../feature/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '../../../schema/updateUserSchema'
import ErrorInput from '../../../component/ui/ErrorInput'
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
    resolver: zodResolver(updateUserSchema),
  })
  const onSubmit = async (data) => {
    const { status } = await sendHttp(authAPI.updateUser, data, currentUser.userID, {
      success: 'Update user success',
      error: 'Update user failed',
    })
    if (status === 'success') {
      dispatch(authAction.updateCurrentUser(data))
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Your Name" id="name" {...register('fullName')} />
      {errors.fullName?.message && <ErrorInput>{errors.fullName?.message}</ErrorInput>}
      <Input label="Email" id="email" {...register('email')} />
      {errors.email?.message && <ErrorInput>{errors.email?.message}</ErrorInput>}
      <Input label="Phone Number" id="phoneNum" {...register('phoneNum')} />
      {errors.phoneNum?.message && <ErrorInput>{errors.phoneNum?.message}</ErrorInput>}
      <Input label="Address" id="address" {...register('address')} />
      {errors.address?.message && <ErrorInput>{errors.address?.message}</ErrorInput>}
      <div>
        <Button className="mt-8 bg-fourth text-third">Change</Button>
      </div>
    </form>
  )
}

export default MyProfile

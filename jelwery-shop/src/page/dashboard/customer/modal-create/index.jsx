import { useForm } from 'react-hook-form'
import Modal from '../../../../component/ui/Modal'
import ContainerAuth from '../../../../auth/components/ContainerAuth'
import Input from '../../../../component/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../../../schema'
import ErrorInput from '../../../../component/ui/ErrorInput'
import { sendHttp } from '../../../../utils/send-http'
import authAPI from '../../../../feature/auth/authApi'
import { useDispatch } from 'react-redux'
import { authAction } from '../../../../feature/auth/authSlice'

function ModalCreateUser({ handler, open }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })
  const onSubmit = async (data) => {
    const { resData, status } = await sendHttp(authAPI.createCustomer, data, null, {
      success: 'Create success',
      error: 'Create failed',
    })
    const userID = resData?.data
    if (status === 'success') {
      const { resData } = await sendHttp(authAPI.getUserById, userID)
      dispatch(authAction.addNewUser(resData))
      reset()
      handler()
    }
  }
  const handleClose = () => {
    handler()
  }
  return (
    <Modal handler={handler} open={open}>
      <div className="px-2 py-2 text-black">
        <ContainerAuth title="Sign Up">
          <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex gap-4">
              <button className="btn bg-primary text-white hover:opacity-70 active:opacity-100">
                Create
              </button>
              <button
                type="button"
                className="btn rounded-md border border-secondary text-primary"
                onClick={() => {
                  handleClose()
                }}
              >
                Close
              </button>
            </div>
          </form>
        </ContainerAuth>
      </div>
    </Modal>
  )
}

export default ModalCreateUser

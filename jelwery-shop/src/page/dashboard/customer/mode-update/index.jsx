import { useForm } from 'react-hook-form'
import Modal from '../../../../component/ui/Modal'
import ContainerAuth from '../../../../auth/components/ContainerAuth'
import Input from '../../../../component/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'

import ErrorInput from '../../../../component/ui/ErrorInput'
import { sendHttp } from '../../../../utils/send-http'
import authAPI from '../../../../feature/auth/authApi'
import { useEffect } from 'react'
import { updateUserSchema } from '../../../../schema/updateUserSchema'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { authAction } from '../../../../feature/auth/authSlice'

function ModalUpdateUser({ handler, open, customer }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: '',
      phoneNum: '',
      address: '',
      email: '',
    },
  })

  const handleClose = () => {
    handler()
  }
  const onSubmit = async (data) => {
    toast.message(JSON.stringify(data))
    const { status } = await sendHttp(authAPI.updateUser, data, customer?.userID, {
      success: 'Create success',
      error: 'Create failed',
    })
    if (status === 'success') {
      dispatch(authAction.updateUser({ userID: customer?.userID, dataUpdate: data }))
      reset()
      handler()
    }
  }

  useEffect(() => {
    if (customer) {
      reset({
        fullName: customer.fullName,
        phoneNum: customer.phoneNum,
        address: customer.address,
        email: customer.email,
      })
    }
  }, [open])
  return (
    <Modal handler={handler} open={open}>
      <div className="px-2 py-2 text-black">
        <ContainerAuth title="Sign Up">
          <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
                Update
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

export default ModalUpdateUser

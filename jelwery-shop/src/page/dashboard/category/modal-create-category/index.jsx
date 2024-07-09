import React from 'react'
import Modal from '../../../../component/ui/Modal'
import Input from '../../../../component/ui/Input'
import ErrorInput from '../../../../component/ui/ErrorInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { categorySchema } from '../../../../schema/categorySchema'
import ContainerAuth from '../../../../auth/components/ContainerAuth'
import categoryApi from '../../../../feature/category/categoryApi'
import { sendHttp } from '../../../../utils/send-http'
import { useDispatch } from 'react-redux'
import { categoryActions } from '../../../../feature/category/categorySlice'

function ModalCreateCategory(props) {
  const dispatch = useDispatch()
  const handleClose = () => {
    props.handler()
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  })
  const onSubmit = async (data) => {
    const { resData } = await sendHttp(categoryApi.createCategroy, data)
    if (resData) {
      const category = resData?.data
      dispatch(categoryActions.addCategory(category))
      reset()
      handleClose()
    }
  }
  return (
    <Modal {...props}>
      <div className="px-2 py-2 text-black">
        <ContainerAuth title="Create Category">
          <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Category Name" id="name" {...register('catName')} />
            {errors.catName?.message && <ErrorInput>{errors.catName?.message}</ErrorInput>}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-medium text-third">
                Description
              </label>
              <textarea id="description" {...register('description')} className="input"></textarea>
            </div>
            {errors.description?.message && <ErrorInput>{errors.description?.message}</ErrorInput>}
            <div className="mt-2 flex gap-4">
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

export default ModalCreateCategory

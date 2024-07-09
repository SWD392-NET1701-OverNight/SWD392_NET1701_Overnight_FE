import React, { useEffect } from 'react'
import Modal from '../../../../component/ui/Modal'
import ContainerAuth from '../../../../auth/components/ContainerAuth'
import Input from '../../../../component/ui/Input'
import ErrorInput from '../../../../component/ui/ErrorInput'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema } from '../../../../schema/categorySchema'
import { toast } from 'sonner'
import { sendHttp } from '../../../../utils/send-http'
import categoryApi from '../../../../feature/category/categoryApi'
import { categoryActions } from '../../../../feature/category/categorySlice'

function ModalUpateCategory({ category, ...props }) {
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
    defaultValues: {
      catName: '',
      description: '',
    },
  })
  const onSubmit = async (data) => {
    const { status } = await sendHttp(categoryApi.updateCategory, data, category?.catID)
    if (status === 'success') {
      dispatch(categoryActions.updateCategory({ catID: category?.catID, data }))
      handleClose()
    }
  }
  useEffect(() => {
    reset({
      catName: category?.catName,
      description: category?.description,
    })
  }, [props.open])
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

export default ModalUpateCategory

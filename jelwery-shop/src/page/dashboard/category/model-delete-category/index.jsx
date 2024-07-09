import React from 'react'
import Modal from '../../../../component/ui/Modal'
import { DialogFooter, DialogHeader } from '@material-tailwind/react'
import { sendHttp } from '../../../../utils/send-http'
import categoryApi from '../../../../feature/category/categoryApi'
import { useDispatch } from 'react-redux'
import { categoryActions } from '../../../../feature/category/categorySlice'

function ModalDeleteCategory({ catID, ...props }) {
  const dispatch = useDispatch()
  const handleDelete = async () => {
    const { status } = await sendHttp(categoryApi.deleteCategory, catID)
    if (status === 'success') {
      dispatch(categoryActions.deleteCategory(catID))
      handleClose()
    }
  }
  const handleClose = () => {
    props.handler()
  }
  return (
    <Modal {...props}>
      <DialogHeader>Are you sure you want to delete this category?</DialogHeader>
      <DialogFooter>
        <button
          className="btn rounded-md border border-red-400 text-red-400"
          onClick={() => {
            handleDelete()
          }}
        >
          Delete
        </button>
        <button
          className="btn text-secondary"
          onClick={() => {
            handleClose()
          }}
        >
          Cancel
        </button>
      </DialogFooter>
    </Modal>
  )
}
export default ModalDeleteCategory

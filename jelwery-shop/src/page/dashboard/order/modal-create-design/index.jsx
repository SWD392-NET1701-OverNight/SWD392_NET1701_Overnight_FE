import React from 'react'
import Modal from '../../../../component/ui/Modal'
import Button from '../../../../component/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { convertRole } from '../../../../utils/convertRole'
import { sendHttp } from '../../../../utils/send-http'
import designApi from '../../../../feature/design/designApi'
import { designActions } from '../../../../feature/design/designSlice'
import { toast } from 'sonner'
import requestApi from '../../../../feature/request/requestApi'
import { requestActions } from '../../../../feature/request/requestSlice'

function ModalCreateDesign({ handler, open, orderInfo }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  async function handleSubmit(e) {
    e.preventDefault()
    const description = e.target.description.value
    const designData = {
      description,
      createBy: convertRole(currentUser?.roleID),
      createDate: new Date(),
      picture: orderInfo?.image,
    }
    const res = await sendHttp(designApi.createDesign, designData)
    if (res) {
      const designData = res?.resData?.data
      dispatch(designActions.addNewDesign(designData))
      const requestData = {
        description: orderInfo?.description,
        status: orderInfo?.status,
        designID: designData?.designID,
        image: orderInfo?.image,
        type: orderInfo?.type,
      }

      const resUpdateReq = await sendHttp(requestApi.updateRequest, requestData, orderInfo?.id)
      if (resUpdateReq) {
        dispatch(requestActions.updateDesign({ id: orderInfo?.id, designID: designData.designID }))
        handler()
      }
    }
  }
  return (
    <Modal open={open} handler={handler}>
      <div className=" px-8 py-8">
        <h2 className="title">Create Design</h2>
        <div className="mt-4 flex gap-8">
          <img src={orderInfo?.image} className="image  w-[200px] rounded-xl" />
          <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="description" className="block text-xl font-medium text-black">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-2 h-[70%] w-full rounded-lg border border-secondary px-4 py-2 text-black outline-none"
              required
            ></textarea>
            <Button type="primary" className="float-right mt-4 font-medium">
              Create
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateDesign

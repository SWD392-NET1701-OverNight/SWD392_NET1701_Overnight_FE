import React, { useEffect, useState } from 'react'
import Modal from '../../../../component/ui/Modal'
import { CircleUserRound, Eye } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { sendGetHttp, sendHttp } from '../../../../utils/send-http'
import authAPI from '../../../../feature/auth/authApi'
import OrderDisplay from '../OrderDisplay'
import { convertUpdateStatus } from '../../../../utils/convertStatus'
import requestApi from '../../../../feature/request/requestApi'
import { requestAction } from '../../../../feature/request/requestSlice'

function ModalOrder({ orderId }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const [customer, setCustomer] = useState({})
  const { productDetail } = useSelector((state) => state.product)
  const [isOpen, setIsOpen] = useState(false)
  const { listRequest } = useSelector((state) => state.request)
  function handleClickModal() {
    setIsOpen((prev) => !prev)
  }
  async function getUserProduct(userID) {
    const { status, resData } = await sendGetHttp(authAPI.getUserById, userID, null, false)
    if (status === 'success') {
      setCustomer(resData)
    }
  }

  const orderInfo = listRequest?.find((item) => item.id === orderId)
  const materialItems = productDetail?.materials?.$values?.map(({ materialName, quantity }) => ({
    materialName,
    quantity,
  }))
  async function handleClickRequest(isApprove = false) {
    const updatingStatus = isApprove
      ? convertUpdateStatus(currentUser?.roleID, orderInfo?.type, orderInfo?.status)
      : 'Cancel'
    const { status } = await sendHttp(requestApi.acceptRequest, updatingStatus, orderId, {
      success: 'Update success',
      error: 'Update fail',
    })
    if (status === 'success') {
      dispatch(requestAction.updateStatus({ id: orderId, status: updatingStatus }))
      handleClickModal()
    }
  }
  useEffect(() => {
    if (orderInfo?.id && isOpen) {
      getUserProduct(orderInfo?.userID)
      dispatch({ type: 'PRODUCT_DETAIL_SAGA', payload: orderInfo?.productID })
    }
  }, [isOpen])
  return (
    <>
      <button
        onClick={() => {
          handleClickModal()
        }}
      >
        <Eye />
      </button>
      <Modal open={isOpen} handler={handleClickModal}>
        <div className=" px-4 py-2">
          <div className="center-space">
            <div className="space-y-2">
              <h1 className="title">Order ID:#{orderInfo?.id}</h1>
              <OrderDisplay
                title="Create At:"
                value={new Date(orderInfo?.createDate).toLocaleDateString()}
              />
              <p className=" rounded-2xl border border-secondary text-center font-normal text-primary">
                {orderInfo?.status}
              </p>
            </div>
            <div className="flex h-[30%] items-center gap-4">
              {orderInfo?.status !== 'Done' && (
                <>
                  <button
                    className="btn bg-green-400 text-white"
                    onClick={() => {
                      handleClickRequest(true)
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="btn text-red-400"
                    onClick={() => {
                      handleClickRequest()
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-[20px] flex gap-4 text-secondary">
            <CircleUserRound />
            <div className="w-[60%]">
              <h2 className="text-xl font-medium text-black">Customer</h2>
              <div className="flex justify-between">
                <div>
                  <OrderDisplay title="Name:" value={customer?.fullName} />
                  <OrderDisplay title="Email:" value={customer?.email} />
                </div>
                <div>
                  <OrderDisplay title="Phone:" value={customer?.phoneNum} />
                  <OrderDisplay title="Address:" value={customer?.address} />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="mt-[20px] text-xl font-medium text-black">Product</h2>
            {orderInfo?.type === 3 && !productDetail?.productName && (
              <button className="btn bg-fourth text-lg font-medium text-third">
                Create Product
              </button>
            )}
            {productDetail?.productName && (
              <div className="flex  gap-4">
                <img
                  src="https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                  className="w-24 rounded-lg"
                />
                <div className="flex w-[80vh] flex-col justify-between">
                  <h2 className="truncate text-xl text-black">{productDetail?.productName}</h2>
                  <OrderDisplay title="Category:" value={productDetail?.categoryName} />
                  <OrderDisplay title="" value={productDetail?.description} />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-start">
            <div className="w-1/3 space-y-2">
              <h2 className="mt-[20px] text-xl font-medium text-black">Design</h2>
              <img
                src={
                  'https://media.istockphoto.com/id/812998192/fr/photo/goldsmith-de-travail.webp?b=1&s=170667a&w=0&k=20&c=pzhpNZvt1pkDlv8Z3wlWojaSzTub5O3fOEtEHz50sKI='
                }
                alt=""
                className="w-24"
              />
            </div>
            {productDetail?.productName && (
              <>
                <div className="w-1/3">
                  <h2 className="mt-[20px] text-xl font-medium text-black">Material</h2>
                  {materialItems?.map(({ materialName, quantity }) => (
                    <OrderDisplay title={materialName + ':'} value={quantity} />
                  ))}
                </div>
                <div>
                  <h2 className="mt-[20px] text-xl font-medium text-black">Price</h2>
                  <OrderDisplay
                    title="Material Price:"
                    value={productDetail?.materialPrice + ' VND'}
                  />
                  <OrderDisplay
                    title="Proccess Price:"
                    value={productDetail?.processPrice + ' VND'}
                  />
                  <OrderDisplay
                    title="Proccess Price:"
                    value={productDetail?.designPrice + ' VND'}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalOrder

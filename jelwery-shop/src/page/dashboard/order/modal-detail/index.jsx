import React, { useEffect, useState } from 'react'
import Modal from '../../../../component/ui/Modal'
import { CircleUserRound, Eye } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { sendGetHttp, sendHttp } from '../../../../utils/send-http'
import authAPI from '../../../../feature/auth/authApi'
import OrderDisplay from '../OrderDisplay'
import { convertOrderType, convertUpdateStatus } from '../../../../utils/convertStatus'
import requestApi from '../../../../feature/request/requestApi'
import { requestActions } from '../../../../feature/request/requestSlice'
import { productAction } from '../../../../feature/product/productSlice'
import ModalCreateDesign from '../modal-create-design'
import ModalCreateProduct from '../modal-create-product'

function ModalOrder({ orderId }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { listDesign } = useSelector((state) => state.design)
  const { productDetail } = useSelector((state) => state.product)
  const { listRequest } = useSelector((state) => state.request)
  const [customer, setCustomer] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCreateDesign, setIsOpenCreateDesign] = useState(false)
  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false)

  function handleClickModal() {
    setIsOpen((prev) => !prev)
  }
  function handleClickCreateDesign() {
    setIsOpenCreateDesign((prev) => !prev)
  }
  function handleClickCreateProduct() {
    setIsOpenCreateProduct((prev) => !prev)
  }
  async function getUserProduct(userID) {
    const { status, resData } = await sendGetHttp(authAPI.getUserById, userID, null, false)
    if (status === 'success') {
      setCustomer(resData)
    }
  }

  const orderInfo = listRequest?.find((item) => item.id === orderId)
  let designItem = listDesign?.find(({ designID }) => designID === productDetail?.designID)
  if (!designItem) {
    designItem = listDesign?.find(({ designID }) => designID === orderInfo?.designID)
  }
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
      dispatch(requestActions.updateStatus({ id: orderId, status: updatingStatus }))
      handleClickModal()
    }
  }
  useEffect(() => {
    if (orderInfo?.id && isOpen) {
      getUserProduct(orderInfo?.userID)
    }
    if (orderInfo?.productID) {
      dispatch({ type: 'PRODUCT_DETAIL_SAGA', payload: orderInfo?.productID })
    }
    return () => {
      dispatch(productAction.resetProductDetail())
    }
  }, [isOpen, orderInfo?.productID])
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
              <div className="flex gap-4">
                <OrderDisplay
                  title="Create At:"
                  value={new Date(orderInfo?.createDate).toLocaleDateString()}
                />
                <OrderDisplay title="Order Type:" value={convertOrderType(orderInfo?.type)} />
              </div>
              <p className=" rounded-2xl border border-secondary text-center font-normal text-primary">
                {orderInfo?.status}
              </p>
            </div>
            <div className="flex h-[30%] items-center gap-4">
              {((orderInfo?.status !== 'Done' && currentUser?.roleID === 3) ||
                (orderInfo?.status === 'Processing' && currentUser?.roleID === 3) ||
                (orderInfo?.status === 'Pending' && currentUser?.roleID === 2) ||
                (orderInfo?.status === 'In-Production' && currentUser?.roleID === 4) ||
                (orderInfo?.status === 'In-Design' && currentUser?.roleID === 5)) && (
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
            {orderInfo?.type === 3 && !productDetail?.productName && currentUser?.roleID === 3 && (
              <button
                className="btn bg-fourth text-lg font-medium text-third"
                onClick={() => {
                  handleClickCreateProduct()
                }}
              >
                Create Product
              </button>
            )}
            {productDetail?.productName && (
              <div className="flex  gap-4">
                <img src={productDetail?.image} alt="" className="w-24 rounded-lg" />
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
              {designItem && (
                <img
                  src={
                    designItem?.picture ||
                    'https://res.cloudinary.com/dlrpmjdzz/image/upload/v1719537703/Swd391/e16f9ed909f8fe3a9c31ec2bd1d30416.jpg'
                  }
                  alt=""
                  className="w-24"
                />
              )}
              {!designItem?.picture && currentUser?.roleID === 3 && orderInfo?.type === 3 && (
                <button
                  className="btn bg-fourth text-lg font-medium text-third"
                  onClick={() => {
                    handleClickCreateDesign()
                  }}
                >
                  Create Design
                </button>
              )}
            </div>
            {productDetail?.productName && (
              <>
                <div className="w-1/3">
                  <h2 className="mt-[20px] text-xl font-medium text-black">Material</h2>
                  {materialItems?.map(({ materialName, quantity }, index) => (
                    <OrderDisplay key={index} title={materialName + ':'} value={quantity} />
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
      <ModalCreateDesign
        open={isOpenCreateDesign}
        handler={handleClickCreateDesign}
        orderInfo={orderInfo}
      />
      <ModalCreateProduct
        open={isOpenCreateProduct}
        handler={handleClickCreateProduct}
        orderInfo={orderInfo}
      />
    </>
  )
}

export default ModalOrder

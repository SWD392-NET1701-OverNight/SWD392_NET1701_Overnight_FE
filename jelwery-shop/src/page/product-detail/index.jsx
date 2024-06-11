import { useParams } from 'react-router-dom'
import Button from '../../component/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getToken } from '../../utils/auth'
import { toast } from 'sonner'
import PriceItem from './PriceItem'
import { sendHttp } from '../../utils/send-http'
import requestApi from '../../feature/request/requestApi'

function ProductDetail() {
  const { productId } = useParams()
  const { currentUser } = useSelector((state) => state.auth)
  const { productDetail } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const totalPrice =
    productDetail.priceMaterial + productDetail.processPrice + productDetail.priceDesign
  async function handleBuyNow() {
    if (!getToken()) {
      toast.error('Please login to buy this product')
      return
    }
    const checkoutData = {
      fullName: currentUser.userName,
      description: "string",
      createdDate: "2024-06-11T02:35:29.373Z",
      requestID: 1,
      amount: totalPrice,
      productID: productId,
    }
   
      const {status,resData} = await sendHttp(requestApi.checkout, checkoutData, currentUser.userId)
    if (status === 'success') {
      window.location.href = resData
    }
  }

  useEffect(() => {
    dispatch({ type: 'PRODUCT_BY_ID_SAGA', payload: productId })
  }, [productId])
  return (
    <div className="flex w-full px-[14%] pt-[50px]">
      <img
        src="https://images.unsplash.com/photo-1611085582956-da557acbc3a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5lY2tsYWNlfGVufDB8fDB8fHww"
        alt="necklace"
        className="image h-[70vh] w-1/2"
      />
      <div className="w-1/2 px-[7%] py-[2%]">
        <h1 className="title">{productDetail.productName}</h1>
        <div className="mt-2 flex items-center">
          <h3 className="text-lg text-secondary">Category</h3>
          <p className="ml-8 text-base text-third">Ring</p>
        </div>

        <div className="mt-8 flex justify-between">
          <PriceItem title="Material Price" price={productDetail.priceMaterial} />
          <PriceItem title="Proccessing Price" price={productDetail.processPrice} />
        </div>
        <div className="mt-8">
          <PriceItem title="Design Price" price={productDetail.priceDesign} />
        </div>
        <div className="mt-8 flex items-center">
          <Button
            type="primary"
            onClick={() => {
              handleBuyNow()
            }}
          >
            Buy Now
          </Button>
          <p className="ml-8 text-xl font-medium text-secondary">${totalPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

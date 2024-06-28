import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../component/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import PriceItem from './PriceItem'
import { sendHttp } from '../../utils/send-http'
import productApi from '../../feature/product/productApi'
import { Tooltip } from '@material-tailwind/react'
import { useCheckout } from '../../hooks'

function ProductDetail() {
  const { productId } = useParams()
  const { currentUser, isAuth } = useSelector((state) => state.auth)
  const { productDetail } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handeCheckout } = useCheckout()
  const totalPrice =
    productDetail.materialPrice + productDetail.processPrice + productDetail.designPrice
  async function handleBuyNow() {
    handeCheckout(productId, totalPrice * 100)
  }
  async function handleCustomProduct() {
    const { status, resData } = await sendHttp(
      productApi.customProduct,
      productId,
      null,
      null,
      false,
    )
    if (status === 'success') {
      navigate('/custom-product', { state: { customProductId: resData.data } })
    }
  }
  useEffect(() => {
    dispatch({ type: 'PRODUCT_DETAIL_SAGA', payload: productId })
  }, [productId])
  useEffect(() => {
    if (!currentUser.email && isAuth) {
      dispatch({ type: 'GET_USER_BY_ID_SAGA', payload: currentUser.userID })
    }
  }, [currentUser?.email, isAuth])
  return (
    <div className="flex w-full px-[14%] pt-[50px]">
      <img
        src="https://images.unsplash.com/photo-1611085582956-da557acbc3a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5lY2tsYWNlfGVufDB8fDB8fHww"
        alt="necklace"
        className="image h-[100vh] w-1/2 rounded-lg"
      />
      <div className="w-1/2 px-[7%] py-[2%]">
        <h1 className="title">{productDetail.productName}</h1>
        <div className="mt-2 flex items-center">
          <h3 className="text-lg text-secondary">Category</h3>
          <p className="ml-8 text-base text-third">{productDetail.categoryName}</p>
        </div>
        <Tooltip content={<p className="tooltip">{productDetail.description}</p>}>
          <p className="mt-4 w-full truncate text-lg text-third">{productDetail.description}</p>
        </Tooltip>

        <div className="mt-4 flex justify-between">
          <PriceItem title="Material Price" price={productDetail.materialPrice} />
          <PriceItem title="Proccessing Price" price={productDetail.processPrice} />
        </div>
        <div className="mt-8">
          <PriceItem title="Design Price" price={productDetail.designPrice} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="mt-4 text-lg text-secondary">Material</p>
          <ul className="flex list-none gap-2">
            {productDetail?.materials?.$values.map(({ materialName }, index) => (
              <li key={index} className="text-lg text-gray-700">
                {materialName}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex items-center space-x-4">
          <Button
            type="primary"
            onClick={() => {
              handleBuyNow()
            }}
          >
            Buy Now
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              handleCustomProduct()
            }}
          >
            Custom
          </Button>
          <p className="text-xl font-medium text-secondary">${totalPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

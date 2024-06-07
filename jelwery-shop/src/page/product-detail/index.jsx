import { useParams } from 'react-router-dom'
import Button from '../../component/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function ProductDetail() {
  const { productId } = useParams()
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { productDetail } = useSelector((state) => state.product)
  function handleBuyNow() {
    dispatch({
      type: 'CREATE_REQUEST_SAGA',
      payload: {
        data: { description: 'Test', status: 'Pending', productID: productId },
        userId: currentUser.userId,
      },
    })
  }
  useEffect(() => {
    dispatch({ type: 'PRODUCT_BY_ID_SAGA', payload: id })
  }, [id])
  return (
    <div className="flex w-full px-[14%] pt-[50px]">
      <img
        src="https://images.unsplash.com/photo-1611085582956-da557acbc3a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5lY2tsYWNlfGVufDB8fDB8fHww"
        alt="necklace"
        className="image h-[70vh] w-1/2"
      />
      <div className="w-1/2 px-[7%] py-[2%]">
        <h1 className="title">Product Name</h1>
        <div className="mt-2 flex items-center">
          <h3 className="text-lg text-secondary">Category</h3>
          <p className="ml-8 text-base text-third">Ring</p>
        </div>

        <div className="mt-8">
          <p className="text-lg  font-normal uppercase text-secondary">Material Price</p>
          <p className="mt-2 w-[40%] rounded-lg border border-secondary px-2 py-2 text-center text-base text-secondary">
            {productDetail.priceMaterial}
          </p>
        </div>
        <div className="mt-8">
          <p className="text-lg  font-normal uppercase text-secondary">Price Design</p>
          <p className="mt-2 w-[40%] rounded-lg border border-secondary px-2 py-2 text-center text-base text-secondary">
            {productDetail.priceDesign}
          </p>
        </div>
        <div className="mt-8 flex items-center">
          <Button type="primary" onClick={handleBuyNow}>
            Buy Now
          </Button>
          <p className="ml-8 text-xl font-medium text-secondary">$32.00</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadingOrderCard from '../HeadingOrderCard'
import ParagraphOrderCard from '../ParagraphOrderCard'
import { Link, useNavigation } from 'react-router-dom'
import { Tooltip } from '@material-tailwind/react'
import { useCheckout } from '../../../hooks/useCheckout'
function MyOrder() {
  const { handeCheckout } = useCheckout()
  const { currentUser } = useSelector((state) => state.auth)
  const { listRequest } = useSelector((state) => state.request)
  const { listProduct } = useSelector((state) => state.product)
  const { listCategory } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const listRequestById = listRequest?.filter((item) => item.userID === currentUser?.userID)
  const isEmptyOrder = listRequestById?.length === 0
  useEffect(() => {
    if (listProduct.length === 0) {
      dispatch({ type: 'PRODUCT_LIST_SAGA' })
    }
    setTimeout(() => {
      dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
    }, 500)
  }, [])
  return (
    <div
      className={`scrollbar h-[80vh] space-y-10 ${isEmptyOrder ? '' : 'overflow-y-scroll'} pr-6`}
    >
      {listRequestById?.map(({ id, createDate, status, productID, type }, index) => {
        const date = new Date(createDate)

        const product = listProduct?.find((item) => item.productID === productID)
        const category = listCategory?.find((item) => item.catID === product?.categoryID)

        const total = product?.priceDesign + product?.priceMaterial + product?.processPrice
        return (
          <div key={index} className="w-full">
            <div className="space-y-2 bg-fourth px-[8%] py-4">
              <HeadingOrderCard title={`Order no:${id}`} />
              <div className="flex justify-between">
                <ParagraphOrderCard title="Order Date" value={date.toLocaleDateString()} />
                <ParagraphOrderCard title="Status" value={status} />
              </div>
            </div>
            <div className="flex h-[175px] items-center gap-2">
              <img src={product?.image} alt="jewelry" className="image w-[140px] rounded-lg" />
              <div className="flex h-full w-full flex-col justify-between">
                <Tooltip content={<p className="tooltip">{product?.productName}</p>}>
                  <h3 className="w-[300px] truncate text-2xl font-semibold text-secondary">
                    {product?.productName}
                  </h3>
                </Tooltip>
                <ParagraphOrderCard title="Catogory" value={category?.catName || ''} />
                <ParagraphOrderCard title="Total" value={`${total * 100 || 0}`} />
              </div>
            </div>
          </div>
        )
      })}
      {isEmptyOrder && (
        <div className="mt-[20px] flex justify-center">
          <div className="text-center">
            <img
              src="https://img.icons8.com/?size=100&id=16501&format=png&color=000000"
              alt="Empty Order"
              className="image w-full"
            />
            <p className=" text-2xl text-third">No order yet</p>
            <Link to="/product-list" className="text-base text-secondary underline">
              Buy now
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyOrder

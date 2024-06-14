import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadingOrderCard from '../HeadingOrderCard'
import ParagraphOrderCard from '../ParagraphOrderCard'
import { Link } from 'react-router-dom'
function MyOrder() {
  const { currentUser } = useSelector((state) => state.auth)
  const { listRequest } = useSelector((state) => state.request)
  const { listProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const listRequestById = listRequest?.filter((item) => item.userID === currentUser?.userId)
  const isEmptyOrder = listRequestById?.length === 0
  useEffect(() => {
    dispatch({ type: 'PRODUCT_LIST_SAGA' })
    setTimeout(() => {
      dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
    }, 500)
  }, [])
  return (
    <div
      className={`scrollbar h-[80vh] space-y-10 ${isEmptyOrder ? '' : 'overflow-y-scroll'} pr-6`}
    >
      {listRequestById?.map(({ id, createDate, status, productID }) => {
        const date = new Date(createDate)
        const { priceDesign, priceMaterial, processPrice } = listProduct?.find(
          (item) => item.productID === productID,
        )
        const total = priceDesign + priceMaterial + processPrice
        return (
          <>
            <div className="space-y-2 bg-fourth px-[8%] py-4">
              <HeadingOrderCard title={`Order no:${id}`} />
              <div className="flex justify-between">
                <ParagraphOrderCard title="Order Date" value={date.toLocaleDateString()} />
                <ParagraphOrderCard title="Status" value={status} />
              </div>
            </div>
            <div className="flex h-[175px] items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5lY2tsYWNlfGVufDB8fDB8fHww"
                alt="jewelry"
                className="image w-[140px] rounded-lg"
              />
              <div className="flex h-full flex-col justify-between">
                <HeadingOrderCard title="" />
                <ParagraphOrderCard title="Catogory" value="Necklace" />
                <ParagraphOrderCard title="Total" value={`$${total}`} />
              </div>
            </div>
            <div className="h-2 w-full rounded-lg bg-fourth"></div>
          </>
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

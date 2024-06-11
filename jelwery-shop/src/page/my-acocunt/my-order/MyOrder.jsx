import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadingOrderCard from '../HeadingOrderCard'
import ParagraphOrderCard from '../ParagraphOrderCard'
function MyOrder() {
  const { currentUser } = useSelector((state) => state.auth)
  const { listRequest } = useSelector((state) => state.request)
  const { listProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const listRequestById = listRequest.filter((item) => item.userID === currentUser.userId)
  useEffect(() => {
    dispatch({ type: 'GET_ALL_REQUEST_SAGA' })
  }, [])
  return (
    <div className="scrollbar h-[80vh] space-y-10 overflow-y-scroll pr-6">
      {listRequestById.map(({ id, createDate, status, productID }, index) => {
        const date = new Date(createDate)
        const { priceMaterial, priceDesign, processPrice } = listProduct.find(
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
                <HeadingOrderCard title="Product Name" />
                <ParagraphOrderCard title="Catogory" value="Necklace" />
                <ParagraphOrderCard title="Total" value={`$${total}`} />
              </div>
            </div>
            <div className="h-2 w-full rounded-lg bg-fourth"></div>
          </>
        )
      })}
    </div>
  )
}

export default MyOrder

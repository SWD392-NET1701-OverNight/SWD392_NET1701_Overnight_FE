import { Check, CircleAlert } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import requestApi from '../../feature/request/requestApi'
import { sendHttp } from '../../utils/send-http'
import { useEffect } from 'react'

function Payment() {
  const { currentUser } = useSelector((state) => state.auth)
  const [searchParam] = useSearchParams()
  const search = searchParam.get('mode')
  const productId = searchParam.get('productID')
  const requestData = {
    description: 'Buy Product',
    status: 'Processing',
    productID: productId,
    type: 1,
  }

  async function createRequest() {
    await sendHttp(requestApi.createRequest, requestData, currentUser.userId, {
      success: 'Payment Successful',
      error: 'Payment Failed',
    })
  }
  useEffect(() => {
    if (search === 'success') createRequest()
  }, [])
  return (
    <div className="center h-[100vh] px-[14%] ">
      <div className="space-y-4">
        <div className="center w-full ">
          {search === 'success' ? (
            <Check
              size={48}
              strokeWidth={3}
              className="rounded-xl border-4 border-primary text-primary"
            />
          ) : (
            <CircleAlert
              size={48}
              strokeWidth={3}
              className="text-seconborder-secondary rounded-xl"
            />
          )}
        </div>
        {search === 'success' ? (
          <>
            <h1 className="text-center text-2xl font-bold text-primary">Payment Successful</h1>
            <Link to="/my-account" className="btn border-2 border-third text-secondary">
              View Order History
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-bold text-secondary">Payment Failed</h1>
            <Link to="/" className="btn border-2 border-third text-secondary">
              Go to the Home Page
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Payment

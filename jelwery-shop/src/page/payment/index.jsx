import { Check, CircleAlert } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { sendGetHttp, sendHttp } from '../../utils/send-http'
import requestApi from '../../feature/request/requestApi'
import { useEffect, useState } from 'react'

function Payment() {
  const [searchParam] = useSearchParams()
  const search = searchParam.get('mode')
  const requestID = searchParam.get('requestID')
  const [requestItem, setRequestItem] = useState(null)

  if (requestItem?.status === 'Payment' && requestItem?.status === 'Payment') {
    updateRequest()
  }
  async function updateRequest() {
    await sendHttp(
      requestApi.updateRequest,
      { ...requestItem, status: 'In-Design' },
      requestID,
      null,
      false,
    )
  }
  async function getRequestId() {
    const { resData } = await sendGetHttp(requestApi.getRequestByID, requestID, null, false)
    setRequestItem(resData.data)
  }
  useEffect(() => {
    getRequestId()
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

// const connection = new HubConnectionBuilder()
//     .withUrl('https://localhost:7147/MatPriceHub')
//     .build()
//   connection
//     .start()
//     .then(() => console.log('Connected to SignalR hub'))
//     .catch((err) => console.error('Error connecting to hub:', err))

//   connection.on('ReceiveMessage', (message) => {
//     console.log('Received message:', message)
//   })

//   connection.on('ProductUpdate', (message) => {
//     console.log('Received message:', message)
//   })

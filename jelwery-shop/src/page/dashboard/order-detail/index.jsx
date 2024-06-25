import React from 'react'
import { useParams } from 'react-router-dom'

function OrderDetail() {
  const { orderId } = useParams()

  return <div>OrderDetail</div>
}

export default OrderDetail

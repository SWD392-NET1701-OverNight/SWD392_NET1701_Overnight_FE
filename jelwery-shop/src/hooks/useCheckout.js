import { toast } from 'sonner'
import requestApi from '../feature/request/requestApi'
import { getToken } from '../utils/auth'
import { useSelector } from 'react-redux'
import { sendHttp } from '../utils/send-http'

export function useCheckout() {
  const { currentUser } = useSelector((state) => state.auth)
  async function handeCheckout(productId, totalPrice) {
    if (!getToken()) {
      toast.error('Please login to buy this product')
      return
    }
    const userId = currentUser.userID

    const checkoutData = {
      UserID: userId,
      description: 'Buy product',
      createdDate: new Date().toISOString(),
      amount: totalPrice,
      productID: productId,
    }
    console.log(checkoutData)
    const { status, resData } = await sendHttp(requestApi.checkout, checkoutData, userId, {
      success: 'Go to checkout page',
      error: '',
    })
    if (status === 'success') {
      window.location.href = resData
    }
  }
  return { handeCheckout }
}

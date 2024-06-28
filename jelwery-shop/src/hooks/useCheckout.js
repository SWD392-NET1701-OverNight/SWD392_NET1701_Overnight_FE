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
    const checkoutData = {
      fullName: currentUser.fullName,
      description: 'Buy product',
      createdDate: new Date().toISOString(),
      amount: totalPrice,
      productID: productId,
    }

    const { status, resData } = await sendHttp(
      requestApi.checkout,
      checkoutData,
      currentUser.userId,
      { success: 'Go to checkout page', error: '' },
    )
    if (status === 'success') {
      window.location.href = resData
    }
  }
  return { handeCheckout }
}

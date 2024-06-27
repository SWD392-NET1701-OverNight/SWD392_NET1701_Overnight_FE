import { toast } from 'sonner'

export async function sendHttp(axiosApi, data, id = null, message = null, isToast = true) {
  try {
    const resData = await axiosApi(data, id)
    if (isToast) {
      toast.success(resData?.message || message?.success)
    }
    return { status: 'success', resData }
  } catch (error) {
    if (isToast) {
      toast.error(error?.response?.data?.message || message?.error)
    }
    return { status: 'error' }
  }
}
export async function sendGetHttp(axiosApi, id = null, message = null, isToast = true) {
  try {
    const resData = await axiosApi(id)
    if (isToast) {
      toast.success(resData?.message || message?.success)
    }
    return { status: 'success', resData }
  } catch (error) {
    if (isToast) {
      toast.error(error?.response?.data?.message || message?.error)
    }
    return { status: 'error' }
  }
}

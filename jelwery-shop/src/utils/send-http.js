import { toast } from 'sonner'

export async function sendHttp(axiosApi, data, id = null, message = null) {
  try {
    const resData = await axiosApi(data, id)
    toast.success(resData.message || message.success)
    return { status: 'success', resData }
  } catch (error) {
    toast.error(error.response.data.message || message.error)
  }
}

import { toast } from 'sonner'

export async function sendHttp(axiosApi, data, id = null) {
  try {
    const resData = await axiosApi(data, id)
    toast.success(resData.message)
    return 'success'
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

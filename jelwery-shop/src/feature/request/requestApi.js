import axiosClient from '../../api/axiosClient'

const requestApi = {
  createRequest: (data, userId) =>
    axiosClient.post(`/api/Request/create-request?UserID=${userId}`, data),
}
export default requestApi

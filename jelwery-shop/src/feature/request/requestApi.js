import axiosClient from '../../api/axiosClient'

const requestApi = {
  createRequest: (data, userId) =>
    axiosClient.post(`/api/Request/create-request?UserID=${userId}`, data),
  getListRequestByUserId: (userId) => axiosClient.get(``),
}
export default requestApi

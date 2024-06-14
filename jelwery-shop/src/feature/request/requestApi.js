import axiosClient from '../../api/axiosClient'

const requestApi = {
  createRequest: (data, userId) =>
    axiosClient.post(`/api/Request/create-request?UserID=${userId}`, data),
  checkout: (data, userId) => axiosClient.post(`/api/Request/checkout?UserID=${userId}`, data),
  getAllRequest: () => axiosClient.get('/api/Request/get-all-request'),
}

export default requestApi

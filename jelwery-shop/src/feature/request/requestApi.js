import axiosClient from '../../api/axiosClient'

const requestApi = {
  createRequest: (data, userId) =>
    axiosClient.post(`/api/Request/create-request?UserID=${userId}`, data),
  checkout: (data, userId) => axiosClient.post(`/api/Request/checkout?UserID=${userId}`, data),
  getAllRequest: () => axiosClient.get('/api/Request/get-all-request'),
  getRequestByStatus: (status, role) =>
    axiosClient.get(`/api/Request/get-request-by-status?role=${role}&status=${status}`),
  acceptRequest: (status, id) =>
    axiosClient.put(`/api/Request/approve-request/${id}?status=${status}`),
  getRequestStatistic: () => axiosClient.get('/api/Request/get-request-by-Date'),
  updateRequest: (data, id) => axiosClient.put(`/api/Request/update-request/${id}`, data),
  getAllRequestByUserID: (id) => axiosClient.get(`/api/Request/get-request-by-userID/${id}`),
  getRequestByID: (id) => axiosClient.get(`/api/Request/get-request/${id}`),
}

export default requestApi

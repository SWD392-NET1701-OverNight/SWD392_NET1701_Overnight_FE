import axiosClient from '../../api/axiosClient'

const authAPI = {
  login: (data) => axiosClient.post('/api/Users/login', data),
  signIn: (data) => axiosClient.post('/api/Users/register', data),
  getUerById: (id) => axiosClient.get(`/api/Users/get-user/${id}`),
  updateUser: (data, id) => axiosClient.put(`/api/Users/update-profile/${id}`, data),
}
export default authAPI

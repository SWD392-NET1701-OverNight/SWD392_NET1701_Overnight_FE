import axiosClient from '../../api/axiosClient'

const authAPI = {
  login: (data) => axiosClient.post('/api/Users/login', data),
  signIn: (data) => axiosClient.post('/api/Users/register', data),
  confirmEmail : (data) => axiosClient.post(`/api/Users/Confirm-email?email=${data}`,data),
  resetPassword : (data) => 
  axiosClient.post(`/api/Users/Reset-passworf?email=${data.email}&password=${data.password}&otp=${data.otp}`, data),
  getUerById: (id) => axiosClient.get(`/api/Users/get-user/${id}`),
  updateUser: (data, id) => axiosClient.put(`/api/Users/update-profile/${id}`, data),
}

export default authAPI

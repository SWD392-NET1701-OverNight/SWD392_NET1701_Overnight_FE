import axiosClient from '../../api/axiosClient'

const authAPI = {
  login: (data) => axiosClient.post('/api/Users/login', data),
  signIn: (data) => axiosClient.post('/api/Users/register', data),
  //confirmEmail : (data) => axiosClient.post('/api/Users/Confirm-email', data),
  confirmEmail : (data) => axiosClient.post(`/api/Users/Confirm-email?email=${data}`,data),
  resetPassword : (data) => 
  axiosClient.post(`/api/Users/Reset-passworf?email=${data.email}&password=${data.password}&otp=${data.OTP}`, data),
}

export default authAPI

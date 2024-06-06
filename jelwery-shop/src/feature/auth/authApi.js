import axiosClient from '../../api/axiosClient'

const authAPI = {
  login: (data) => axiosClient.post('/api/Users/login', data),
  signIn: (data) => axiosClient.post('/api/Users/register', data),
}
export default authAPI

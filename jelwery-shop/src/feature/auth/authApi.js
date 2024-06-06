import axiosClient from '../../api/axiosClient'

const authAPI = {
  login: (data) => axiosClient.post('', data),
}
export default authAPI

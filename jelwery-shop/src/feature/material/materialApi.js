import axiosClient from '../../api/axiosClient'

const materialApi = {
  getMateiral: () => axiosClient.get('/api/Material/get-all-Material'),
}
export default materialApi

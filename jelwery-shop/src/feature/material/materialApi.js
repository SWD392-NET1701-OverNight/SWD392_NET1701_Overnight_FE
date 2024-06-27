import axiosClient from '../../api/axiosClient'

const materialApi = {
  getAllMateiral: () => axiosClient.get('/api/Material/get-all-Material'),
}
export default materialApi

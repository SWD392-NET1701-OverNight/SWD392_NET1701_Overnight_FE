import axiosClient from '../../api/axiosClient'

const categoryApi = {
  getAllCategory: () => axiosClient.get('/api/Category/get-all-Category'),
}
export default categoryApi

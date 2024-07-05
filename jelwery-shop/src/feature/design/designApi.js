import axiosClient from '../../api/axiosClient'

const designApi = {
  getAllDesign: () => axiosClient.get('/api/Design/get-all-design'),
  createDesign: (data) => axiosClient.post('/api/Design/create-design-customer', data),
}
export default designApi

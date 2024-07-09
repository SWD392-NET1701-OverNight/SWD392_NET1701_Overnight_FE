import axiosClient from '../../api/axiosClient'

const categoryApi = {
  getAllCategory: () => axiosClient.get('/api/Category/get-all-Category'),
  createCategroy: (data) => axiosClient.post('/api/Category/create-Category', data),
  updateCategory: (data, id) => axiosClient.put(`/api/Category/update-Category/${id}`, data),
  deleteCategory: (id) => axiosClient.delete(`/api/Category/delete-Category/${id}`),
}
export default categoryApi

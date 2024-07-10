import axiosClient from '../../api/axiosClient'

const productApi = {
  getListProduct: () => axiosClient.get('/api/Product/get-all-Products'),
  getProductById: (id) => axiosClient.get(`/api/Product/get-Products-by-id?id=${id}`),
  getProductDetail: (id) => axiosClient.get(`/api/Product/Productdetail/${id}`),
  customProduct: (id) => axiosClient.post(`api/Product/Duplicate-Products?PID=${id}`),
  createProduct: (data) => axiosClient.post('/api/Product/Create-Products', data),
}
export default productApi

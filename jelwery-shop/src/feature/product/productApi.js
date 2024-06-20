import axiosClient from '../../api/axiosClient'

const productApi = {
  getListProduct: () => axiosClient.get('/api/Product/get-all-Products'),
  getProductById: (id) => axiosClient.get(`/api/Product/get-Products-by-id?id=${id}`),
  customProduct: (id) => axiosClient.post(`api/Product/Duplicate-Products?PID=${id}`),
}
export default productApi

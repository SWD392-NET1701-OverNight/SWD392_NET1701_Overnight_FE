import axiosClient from '../../api/axiosClient'

const productApi = {
  getListProduct: () => axiosClient.get('/api/Product/get-all-Products'),
  getProductById: (id) => axiosClient.get(`/api/Product/get-Products-by-id?id=${id}`),
}
export default productApi

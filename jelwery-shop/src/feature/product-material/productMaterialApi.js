import axiosClient from '../../api/axiosClient'

const productMaterailApi = {
  getProductMaterial: (id) =>
    axiosClient.get(`/api/ProductMaterial/get-Material-by-ProductId?id=${id}`),
}
export default productMaterailApi

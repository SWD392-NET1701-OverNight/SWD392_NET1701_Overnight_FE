import axiosClient from '../../api/axiosClient'

const productMaterailApi = {
  getProductMaterial: (id) =>
    axiosClient.get(`/api/ProductMaterial/get-Material-by-ProductId?id=${id}`),
  updateProductMaterial: (data, id) =>
    axiosClient.put(`api/ProductMaterial/Update-Material-by-ProductId?id=${id}`, data),
}

export default productMaterailApi
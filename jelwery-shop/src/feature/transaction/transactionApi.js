import axiosClient from '../../api/axiosClient'

const transactionApi = {
  getTransaction: async (userId) =>
    axiosClient.get(`api/Transaction/get-transaction-by-userID?UserID=${userId}`),
}
export default transactionApi

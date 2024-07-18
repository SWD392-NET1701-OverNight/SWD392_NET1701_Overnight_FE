import axiosClient from '../../api/axiosClient'

const feedbackAPI = {
  createFeedback: (data) => axiosClient.post('/create-feedback', data),
  getAllFeedback: () => axiosClient.get('/get-all-feedback'),
}

export default feedbackAPI

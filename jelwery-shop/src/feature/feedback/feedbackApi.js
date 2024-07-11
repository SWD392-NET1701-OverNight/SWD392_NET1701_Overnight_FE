import axiosClient from '../../api/axiosClient'

const feedbackAPI = {
  createFeedback: (data) => axiosClient.post('/create-feedback', data),
}

export default feedbackAPI

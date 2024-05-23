import axiosClient from './axiosClient';

const authAPI = {
  login: (data) => axiosClient.post('auth', data),
};
export default authAPI;

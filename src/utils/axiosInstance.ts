// src/utils/axiosInstance.ts
import axios from 'axios';
import store from '../store/store';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5258/api',
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

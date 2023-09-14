import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
});

axiosInstance.interceptors.request.use((config) => {
  const token = process.env.API_KEY;

  const bearer = (token && `Bearer ${token}`) || undefined;

  const headers = config.headers || {};
  headers.Authorization = bearer;
  config.headers = headers;
  return config;
});

export default axiosInstance;

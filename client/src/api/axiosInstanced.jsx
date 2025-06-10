import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://abtigthts-production.up.railway.app'
});

export default axiosInstance;
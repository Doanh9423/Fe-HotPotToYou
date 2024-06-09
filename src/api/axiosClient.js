import axios from 'axios';

export const VITE_API_BASE_URL = 'https://hotpottoyou.azurewebsites.net';
const axiosClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

/* Export */
export default axiosClient;

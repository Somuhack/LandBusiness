// utils/axiosConfig.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Update if deployed
});

// Attach token to each request if available
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('userToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

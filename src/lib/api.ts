import axios from 'axios';
import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(url: string): Promise<ApiResponse<T>> =>
    api.get(url).then((res) => res.data),
  post: <T>(url: string, data: any): Promise<ApiResponse<T>> =>
    api.post(url, data).then((res) => res.data),
  put: <T>(url: string, data: any): Promise<ApiResponse<T>> =>
    api.put(url, data).then((res) => res.data),
  delete: <T>(url: string): Promise<ApiResponse<T>> =>
    api.delete(url).then((res) => res.data),
};

export default api;